// Sync Code
console.log('before');

getUser(1)
    .then(user => getRepofromGithub(user.githubUserName))
    .then(repos => getCommits(repos))
    .then(commits => console.log(`Number of commits for user ${commits}`))
    .catch(err => console.log('Error:', err))

// Sync Code
console.log('after');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('1.getUser - Database loading');
            resolve({ id: id, githubUserName: 'Haris'});
        }, 1000);
    })
}

function getRepofromGithub(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('2.getRepofromGithub - Getting Repo from Github');
            resolve(['repo1', 'repo2', 'repo3'])
        }, 1000)
    })
}

function getCommits(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([10])
            console.log('username', username)
        }, 1000)
    })
}