/* ---------------- getUsers ---------------- */

const getUsers = async () => {
    try {
        const response = await axios(`https://ums12.runasp.net/api/users?limit=100`);
        return response.data;
    } catch (error) {
        console.error("Fetch users error:", error);
        alert("Failed to load users ❌");
        return null;
    }
};


/* ----------------  displayUsers  ---------------- */
const displayUsers = async () => {
    const loader = document.querySelector(".loader");

    try {
        loader.style.display = "block";

        const usersData = await getUsers();

        if (!usersData) return;

        const users = usersData.users.map(user => `
            <tr class="hover:bg-gray-50 transition">

                <td class="px-3 py-3 text-gray-400 border-b">
                    ${user.id}
                </td>

                <td class="px-3 py-3 font-medium border-b">
                    ${user.name}
                </td>

                <td class="px-3 py-3 border-b">
                    <img src="${user.imageUrl}" 
                         class="w-30 h-30 rounded-full object-cover border" />
                </td>

                <td class="px-3 py-3 border-b">
                    <div class="flex gap-2">

                        <a href="./user-details.html?userid=${user.id}"
                           target="_blank"
                           class="px-2 py-1 text-xs border rounded-md hover:bg-gray-50">
                           View
                        </a>

                        <button class="px-2 py-1 text-xs border rounded-md hover:bg-gray-50">
                            Edit
                        </button>

                        <button
                            onclick="deleteUser(${user.id})"
                            class="px-2 py-1 text-xs border border-red-100 text-red-500 rounded-md hover:bg-red-50">
                            Delete
                        </button>

                    </div>
                </td>

            </tr>
        `).join("");

        document.querySelector(".userCount").textContent =
            `${usersData.totalCount} Users 🚀`;

        document.querySelector(".userTable").innerHTML = users;

    } catch (error) {
        console.error(error);

        document.querySelector(".userTable").innerHTML = `
            <tr>
                <td colspan="4" class="text-center py-8 text-red-500">
                    Failed to load users ❌
                </td>
            </tr>
        `;
    } finally {
        loader.style.display = "none"; // Mustafa Note: This always runs: if success or if error
    }
};

displayUsers();


/* ---------------- deleteUser ---------------- */


const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`https://ums12.runasp.net/api/users/${id}`);

        if (response.status === 200) {
            alert("User deleted successfully ✅");
            displayUsers();
            //Mustafa Note: or location.href='./user.html';
        }

    } catch (error) {
        alert("Failed to delete user ❌");
    }
};

/* ---------------- Add user ---------------- */

const AddForm = document.forms['addUserForm'];
AddForm.onsubmit = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData(AddForm);
        const response = await axios.post('https://ums12.runasp.net/api/users', formData);

        if (response.status === 200) {
            alert("User added successfully ✅");
            location.href = "./index.html";
        }

    } catch (error) {
        console.error("Add user error:", error);
        alert("Failed to add user ❌");
    }
}