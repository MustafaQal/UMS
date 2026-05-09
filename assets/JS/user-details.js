const params = new URLSearchParams(location.search);
const userid = params.get("userid");
console.log(userid);
const getUser = async ()=> {
        const response = await axios.get(`http://ums12.runasp.net/api/users/${userid}`);
        const data=response.data.data;
        console.log(data);

        document.querySelector(".uname").textContent=data.name;
        document.querySelector(".uemail").textContent=data.email;
        document.querySelector(".uage").textContent=data.age;
}

getUser();