const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Promise p1');
        resolve(1);
    }, 1000)
})

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Promise p2');
        resolve(2);
    }, 1000)
})

Promise.all([p1, p2]).then(result => console.log(result)).catch(err => console.log(err)) 