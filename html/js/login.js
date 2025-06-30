function check(username,password){
    try{
        fetch("data/users.json")
        .then(res => res.json())
        .then(data =>{
            let users = data;
            const user = users.find(u => u.username === username && u.password === password);
        if(user){
            document.cookie = `username=${username}; path=/; max-age=${60*60*24}`;
            alert("login Sucessfull");
            window.location.href="products.html";
        }else{
            alert("No User Found");
            window.location.href="login.html";
        }
        })
    }catch(err){
        document.querySelector("message").textContent = 'Error loading user data.';
        console.error(err);
    }
}

document.querySelector('#login-form').addEventListener('submit', function(e){
    e.preventDefault();
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#pass').value;

    check(username,password);
})