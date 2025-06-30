#!/usr/bin/env python3
import asyncio
import time
import json
import logging
import requests
from bs4 import BeautifulSoup
from telegram import Bot
from telegram.error import TelegramError

# ── CONFIGURATION ──────────────────────────────────────────────────────────────

# Use a stable SelectorEventLoop on Windows
asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

# Your Telegram bot token from BotFather
BOT_TOKEN = "7160677360:AAGF7dFKHSj1e_o8M8Tkn8noUdBvkfqIeCQ"

# The chat ID or channel username where you want to send updates
# e.g. chat_id = 123456789 or "@yourchannelname"
CHAT_ID = "5140665873"

# Stockbit credentials (use environment variables in production)
USERNAME = "soegi"
PASSWORD = "Marvel2009"

LOGIN_URL = "https://stockbit.com/api/login/email"

# The URL you want to monitor, and the CSS selector of the element to watch
TARGET_URL = "https://stockbit.com/screener"
CSS_SELECTOR = "#main-container > div.sc-6f84e760-3.gXCJki > div.sc-6f84e760-1.gxELcs > div > div"  # e.g. "#price", ".headline", "div.main > h1"

# How often to check (in seconds)
CHECK_INTERVAL = 20  # every 5 minutes

# Where to store the last seen value
STATE_FILE = "last_state.json"

session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
})

# ── SETUP LOGGING ───────────────────────────────────────────────────────────────

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)s  %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger(__name__)

# ── STATE MANAGEMENT ────────────────────────────────────────────────────────────

def load_last_state():
    try:
        with open(STATE_FILE, "r") as f:
            data = json.load(f)
            return data.get("last_value", "")
    except (FileNotFoundError, json.JSONDecodeError):
        return ""

def save_last_state(value):
    with open(STATE_FILE, "w") as f:
        json.dump({"last_value": value}, f)

# ── WEB SCRAPING ────────────────────────────────────────────────────────────────

def login():
    """
    Logs in to Stockbit and stores session cookies.
    """
    logger.info("Logging into Stockbit...")

    # First get login page (to retrieve CSRF if needed)
    # resp = session.get(LOGIN_URL)
    # if resp.status_code != 200:
    #     raise RuntimeError("Failed to load login page")

    # You might need to extract CSRF token here if required
    # soup = BeautifulSoup(resp.text, "html.parser")
    # csrf_token = soup.find("input", {"name": "_token"})["value"]

    payload = {
        "username": USERNAME,
        "password": PASSWORD,
        "verificationToken": "03AFcWeA4aLjTkusjNn6ERVeQGssvCYDa5i9sXWS-HSIgU7A6Eilkh1RJsq5fcqppbXEtQPIyFA0_RoaG45c5ug9OqpQbjOZ6nRTRPPJqjwo4grl22M4FN-bQQ6jTP10d_SA-m4EtaGOGCMNiHK0dWaDydDv-I01jt_rDSVXj9A0_L9aujJuYrA9sMmtMvfRpm1cyroha7_wUxTwkxJ5jFSqdQ7wH44T2iXAS5BkN9qDs9zYM6wFO-pGcZkmlZ54oKhJJP1X-xoYjzNzsJn_ybcXbPaUSx63Ss3kOkwABRSz41Mi1gnbDK6KmSNY8Cwoc1BI1WapJCfXGFAkcy_h8Jsq3Y_XFpOyg9_kI_Pk7UfBzMpCXB1BkWhrs3wT0uAAtWLSamkLBCffIQGvOoXw2uQZAMcCqC82ISkmvXnIgoTIj4Ig1cXJwFxtpTqW98mwcZC9u8l_p5L24h-fsMbPdBFACToFz-37KhXYPKDQgo0F6d9sKWTM-qWr2DaYNtDBy1b5qTWFUZp-LsgxYrJA7RYbfGFFTfssRXmHpPqjOfErU-kHywtwMgyEOXbdymkV5P13Blw8gAqd7XRvyGbXVKUjjAyMf7CX_Dpc4UJp8jNUZiYxdOgxYebRcBkXtUPr5wsCNoaa68r5I6Kvz7pcYKcZpP10dsNhRzQG3scMBxXN8L4nKquNbdLHFtOUZV3yoWjZQoCOCyBo14DNjEmaJKyK-H2Hk__RsKj0JynJhDfmGqYNrljdSK5hnIbzuMkVn5v5jqxuooOZQG0pgYr_gw2BEDkXsHEErTgmg0ZKy3XAxJ1TApOvuK424eN5X8ie-n10tv9m5Gq05QD4QU8ihmhkIYYqdBDWMEEXQJai4f5LLGkGmfEBJVZJ3jL-Tgpoy_3eNkgnJuWQgSwbHWQ9QBUzwOzdh5p2zppxj-A3mr5zZWgr5l0-axt99O-tQ32wyYuVTHtCXL3x0b42FWG7aIK-6XapSDJZ6CNKhUg5BCmQtz2zS-QAKuih56AwycIsKqaB0OkZgbv70gJ8nonPmqKpJKO9gK9o8vuWLvqCZvy8Ui6C0ex8m0npdmVhMQk3B0cP5KoBbPMEYhO5_29cHsgGaeajWcW30zPhhPQm6Xc_q8zgpwMiuPu3qciQp_TUc8bQ6o6exPDajNERovuJS1x43XR7rcpXpndZ3RpII2dNdXXoKo1CzjFCGPqogwo2yaba2cY9dqBH9JVlVEdwZRwT-FiclJ-NKQc6WUSdbJM_4jBvgdEwscKdpxm7-TBU4TiV3bFPq7xtvGFXY_gVbBOP-E1CWIaC4fQ0QSEkAYqhFUH1HfjqJXrMJVykCvxVRm4zAGhVq78zPEc3eJvvArvBO3zW0kMPlTcUqxBKXb-lMW4uKldPB_fjMUFdC03zAGwGgLMyYL429oJAsCzrjKSnUTaCBTDBn-PIf4I3-qGPx8XM64QFLIT6K50hE6WEwQt-x6FSF-lQRNO0sqI_SBOID4Fr6EPLqSeWSzAYfqwcbhkfemyehp3CDHdweW12ykVARfD7RrgQJ4grRC1Tn5azVjTkjXXBG1Euut33g1OJTFIk5kqQ8W6eg06dN0qvPJ-RZdwoM7Bui6vGEN8dk9wROEuG_TGhfzX3_qgXRLQfKfWuwtxbu1X5ALpt9-zbyZTLjlFwTMADb4Ar7K8jOQkcnH0U72lzjlQpXHwvf4_uZOMuaU0bdpE4by9t33fkQvJ_AvLK01THFsyoBTe_Pl80HyeSDRce0X1Cr3Bqn3r15NRsuGwOfGuLfoU4AWBZCOIkk3MQnhey0bGltPyQn-A0TaWgGOg8TfCIV6X_ga7MCze_xghYt9H8Y5jGeQW3tvYEoJF1MiadlGpRSEtw5xy8L-qo-kcMLqjOExJ7_tUYhv4Cy0QD3b0l_zD-szg2kdgFp5xkMemybbBOuJCu2K294vDSDe2VyB_6-Eqn9DxhUSIPfe49D4HqBTSuNN_9fMQwELS9x6F62FxhSot-J8D52a_pzRCG_NQeQ-ey5kk86LldUsTFBRpoI8BnrdllpJmzIm8fCJlGSjNT1P0x0lgn0jUYybvISHMg",
        "recaptchaVersion": "RECAPTCHA_VERSION_3"
    }

    login_resp = session.post(LOGIN_URL, data=payload)
    with open("login_response.html", "w", encoding="utf-8") as f:
        f.write(login_resp.text)
    logger.info("Saved login response HTML to login_response.html")
    if login_resp.status_code != 200 or "Stream" not in login_resp.text:
        raise RuntimeError("Login failed or credentials incorrect")

    logger.info("Login successful.")
def fetch_element_text():
    """
    Fetch the page and extract the text of the target element.
    Returns the stripped text, or raises an exception on failure.
    """
    resp = session.get(TARGET_URL, timeout=10)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")
    el = soup.select_one(CSS_SELECTOR)
    if not el:
        raise ValueError(f"Element not found for selector: {CSS_SELECTOR}")
    return el.get_text(strip=True)

# ── TELEGRAM NOTIFICATION ───────────────────────────────────────────────────────

bot = Bot(token=BOT_TOKEN)

def send_telegram_message(text):
    """
    Send a text message via the Telegram Bot API.
    """
    try:
        url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
        data = {"chat_id": CHAT_ID, "text": text, "parse_mode": "Markdown"}
        resp = requests.post(url, data=data, timeout=10)
        resp.raise_for_status()
        logger.info("Sent Telegram notification.")
    except TelegramError as e:
        logger.error(f"Failed to send Telegram message: {e}")

# ── MAIN LOOP ───────────────────────────────────────────────────────────────────

def main():
    logger.info("Starting watcher.")

    try:
        login()
    except Exception as e:
        logger.error(f"Login failed: {e}")
        return
        
    while True:
        try:
            last_value = load_last_state()
            logger.info(f"Last known value: {repr(last_value)}")
            current = fetch_element_text()
            logger.info(f"Fetched current value: {repr(current)}")

            if current != last_value:
                logger.info("Change detected! Sending notification...")
                message = (
                    f"🔔 *Detected change in monitored element!*\n\n"
                    f"• URL: {TARGET_URL}\n"
                    f"• Selector: `{CSS_SELECTOR}`\n"
                    f"• Previous: {last_value!r}\n"
                    f"• Current: {current!r}"
                )
                send_telegram_message(message)
                save_last_state(current)
                last_value = current
            else:
                logger.debug("No change detected.")

        except Exception as e:
            logger.error(f"Error during check: {e}")

        time.sleep(CHECK_INTERVAL)

if __name__ == "__main__":
    main()