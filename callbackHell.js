
// Sync Code
console.log('before');
// Async Code Doesn't block the main thread
// SetTimeout is a callback function so it goes into callback queue and when out stack got emty
// event loop took the SetTimeOut put it inside the stack and execute the code
getUser(1, (user) => {
    console.log('User', user)
    // get the repo
    getRepo(user.githubUserName, (repos) => {
        console.log('Repos', repos)
        getCommits(user.githubUserName, (commits) => {
            console.log(`NUmber of commuts ${commits}`)
        })
    })
});
// Sync Code
console.log('after');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Database loading');
        callback({ id: id, githubUserName: 'Haris'})
    }, 1000)
}

function getRepo(username, callback) {
    setTimeout(() => {
        console.log('Getting Repo from Github');
        callback( ['repo1', 'repo2', 'repo3'])
    }, 1000)
}

function getCommits(username, callback) {
    setTimeout(() => {
        callback([10])
        console.log('username', username)
    }, 1000)
}