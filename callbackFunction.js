
// Sync Code
console.log('before');
// Async Code Doesn't block the main thread
// SetTimeout is a callback function so it goes into callback queue and when out stack got emty
// event loop took the SetTimeOut put it inside the stack and execute the code
getUser(1, getRepo);

function getRepo(user) {
    console.log('User', user)
    // get the repo
    getRepofromGithub(user.githubUserName, getCommits)
}

function getCommits(username, repos) {
    console.log('Repos', repos);
    displayCommits(username, [10]);
}

function displayCommits(username, commits) {
    console.log(`Number of commits for user ${username}: ${commits.length}`);
}
// Sync Code
console.log('after');

function getRepofromGithub(username, callback) {
    setTimeout(() => {
        console.log('Getting Repo from Github');
        callback(username, ['repo1', 'repo2', 'repo3'])
    }, 1000)
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Database loading');
        callback({ id: id, githubUserName: 'Haris'});
    }, 1000);
}

 