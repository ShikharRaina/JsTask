async function getUsers() {
    let response = await fetch('https://dummyjson.com/users');
    let data = await response.json();
    console.log("data: ", data);
    let table = `<table><thead>
    <tr style='text-align: center'>
    <th>Name</th>
    <th>Email</th>
    <th>Gender</th>
    <th>University</th>
    <th>Birth Date</th>
    <th>Action<th>
    </tr></thead><tbody>`;
    data.users.forEach(user => {
        table += `<tr style='text-align: center'>
        <td>`+ (user?.firstName + ' ' + user?.lastName) + `</td>
        <td>`+ user?.email + `</td>
        <td>`+ user?.gender + `</td>
        <td>`+ user?.university + `</td>
        <td>`+ user?.birthDate + `</td>
        <td>
        <button data-id="`+ user?.id + `" id="update">Update</button>
        <button data-id="`+ user?.id + `" id="delete">Delete</button>
        <td>
        </tr>`
    });
    table += '</tbody></table>';
    document.getElementById('users').innerHTML = table;
    $('#add-user').css({
        "display": "none"
    });
    $('#users').css({
        "display": "block"
    });

    $('button#update').click((event) => {
        showForm("update");
        let userId = event.target.attributes['data-id'].value;
        getUserDetailsById(userId);
    });
    $('button#delete').click((event) => {
        let userId = event.target.attributes['data-id'].value;
        deleteUser(userId);
    });
}


async function addUsers(event) {
    event.preventDefault();
    let user = {
        firstName: $('#first-name').val(),
        lastName: $('#last-name').val(),
        email: $('#email').val(),
        gender: $('#gender').val(),
        university: $('#university').val(),
        birthDate: $('#birth-date').val()
    }

    if ($('#submit').attr('data-id') == 'update') {
        user['id'] = $('#user-id').val();
        updateUsers(user);
    } else {
        let response = await fetch('https://dummyjson.com/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then((response) => {
            if (response.status == 200) {
                alert("User Successfully added.");
            } else {
                alert("Failed to add user.");
            }
            console.log(response);
        });
    }
}


async function updateUsers(user) {
    let response = await fetch('https://dummyjson.com/users/' + user.id, {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }).then((response) => {
        if (response.status == 200) {
            alert("User Successfully updated.");
        } else {
            alert("Failed to update user.");
        }
        console.log(response);
    });
}


async function deleteUser(id) {
    let response = await fetch('https://dummyjson.com/users/' + id, {
        method: 'DELETE',
    }).then((response) => {
        if (response.status == 200) {
            getUsers();
            alert("User successfully deleted.");
        } else {
            alert("Failed to delete user.");
        }
        console.log(response);
    });

}

async function getUserDetailsById(id) {
    let response = await fetch('https://dummyjson.com/users/' + id)
    let user = await response.json()
    console.log(user);
    $('#first-name').val(user?.firstName);
    $('#last-name').val(user?.lastName);
    $('#email').val(user?.email);
    $('#gender').val(user?.gender);
    $('#university').val(user?.university);
    $('#birth-date').val(user?.birthDate);
    $('#user-id').val(user?.id);
}


$(document).ready(() => {
    console.log('ready');
    $('button#add-user-link').click(() => {
        showForm("add");
        $('input').val('');
    })
});

function showForm(action) {
    $('#users').css({
        "display": "none"
    });
    console.log('clicked');
    $('#add-user').css({
        "display": "block"
    });
    $('#submit').attr({ "data-id": action })
}