const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');

const git = simpleGit();

async function makeCommit() {
    // Update a file
    const filePath = path.join(__dirname, 'daily_update.txt');
    const currentDate = new Date().toLocaleString();
    const fileContent = `Update on ${currentDate}\n`;

    // Update file content
    fs.writeFileSync(filePath, fileContent);

    try {
        // Fetch repository URL
        const remote = await git.remote(['-v']);
        console.log('Repository URL:', remote);

        // Git operations
        await git.add('./*');
        await git.commit('Daily update');
        await git.push('origin', 'main');
    } catch (error) {
        console.error('Failed to commit and push changes:', error);
    }
}

// Initial commit
makeCommit();

// Update the file every hour
setInterval(makeCommit, 3600000); // 3600000 milliseconds = 1 hour
