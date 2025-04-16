Stockbit Automaton Setup and Uninstall

Welcome to the Stockbit Automaton setup guide!

---

To set up the task:

1. Run setup.bat as Administrator
   Right-click on setup.bat and select "Run as administrator". This is required for creating the scheduled task with elevated privileges.

2. Enter the interval
   When prompted, enter the interval in minutes for how often you want the task to run. For example:
   - If you want the task to run every 1 minute, enter 1.
   - If you want it to run every 5 minutes, enter 5.

3. Task creation
   The script will create a scheduled task that runs the Stockbit Automaton every X minutes (depending on your input). The task will automatically use your current user and will run in the background without any manual intervention.

---

To change the interval:

- Simply run setup.bat again and provide a new interval. The script will update the task with the new interval.
- Make sure you run it as administrator each time you want to update the task.

---

To uninstall the task:

1. Run uninstall.bat as Administrator
   Right-click on uninstall.bat and select "Run as administrator". This will:
   - Delete the scheduled task.
   - Remove the run_playwright.bat helper file created during setup.

2. Confirmation
   After running uninstall.bat, the task will be removed, and no other files will remain.

---

Important Notes:

- Ensure that you run both setup.bat and uninstall.bat as Administrator to grant the necessary permissions to manage scheduled tasks and modify system files.
- If you encounter any issues, double-check your system permissions or contact the administrator of your computer for assistance.

---

Enjoy automating your Stockbit tasks with the Stockbit Automaton!
-ChatGPT