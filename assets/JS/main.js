 const getUsers = async ()=> {
    const response = await axios("http://ums12.runasp.net/api/users?limit=100");
    // const data = response.data.users;
    // return data;
    return response.data;
  
}

const displayUsers = async ()=>{
    const usersget =await getUsers(); 
      console.log(usersget);
    const users = usersget.users.map((user)=>{
        return `
         <tr class="hover:bg-gray-50 transition">
            <td class="px-3 py-3 text-gray-400 border-b border-gray-100">${user.id}</td>
            <td class="px-3 py-3 font-medium border-b border-gray-100">${user.name}</td>
            <!-- <td class="px-3 py-3 text-blue-500 border-b border-gray-100">${user.email}</td> -->
            <!-- <td class="px-3 py-3 border-b border-gray-100">${user.age}</td> --> 
            <td class="px-3 py-3 text-gray-400 border-b border-gray-100">
            <img src="${user.imageUrl}" class="w-50 h-50 rounded-full object-cover border" />
            </td>
            <td class="px-3 py-3 border-b border-gray-100">
              <div class="flex gap-1.5">
                <button class="px-2 py-1 text-xs border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 transition cursor-pointer">View</button>
                <button class="px-2 py-1 text-xs border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 transition cursor-pointer">Edit</button>
                <button class="px-2 py-1 text-xs border border-red-100 rounded-md text-red-500 hover:bg-red-50 transition cursor-pointer" onclick=deleteUser(${user.id})>Delete</button>
              </div>
            </td>
          </tr>
        
        `
    }).join("");
    document.querySelector(".userCount").textContent=`${usersget.totalCount} Users 🚨`;
    document.querySelector(".userTable").innerHTML=users;
}
displayUsers();




const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`http://ums12.runasp.net/api/users/${id}`);

        if (response.status === 200) {
            alert("User deleted successfully ✅");
            displayUsers();
            //or  location.href='./user.html';
        }

    } catch (error) {
        alert("Failed to delete user ❌");
    }
};


const AddForm = document.forms['addUserForm'];
AddForm.onsubmit = async (e)=>{
    e.preventDefault();
    const formData = new FormData(AddForm);
    const addNew = await axios.post('http://ums12.runasp.net/api/users',formData);

    if(addNew.status === 200){
        location.href='./users.html'
    }
}