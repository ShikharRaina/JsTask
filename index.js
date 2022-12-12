async function getUsers(){
    let response = await fetch('https://dummyjson.com/users');
    let data = await response.json();
    console.log("data: ",data);
    let table = `<table><thead>
    <tr style='text-align: center'>
    <th>Name</th>
    <th>Email</th>
    <th>Gender</th>
    <th>Company Name</th>
    <th>Birth Date</th>
    </tr></thead><tbody>`;
    data.users.forEach(user => {
        table += `<tr style='text-align: center'>
        <td>`+(user?.firstName + user?.lastName)+`</td>
        <td>`+user?.email+`</td>
        <td>`+user?.gender+`</td>
        <td>`+user?.company?.name+`</td>
        <td>`+user?.birthDate+`</td>
        </tr>`
    });
    table += '</tbody></table>';
    document.getElementById('users').innerHTML = table;
    
    return data;
}
async function addUsers(){
    let response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName: 'Muhammad',
            lastName: 'Ovi',
            age: 250,
            /* other user data */
        })
    });
    let data = response
    console.log("data: ",data);
    return data;
}
async function updateUsers(){
    let response = await fetch('https://dummyjson.com/users/1',{
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              lastName: 'Owais'
            })
    });
    let data = await response.json()
    console.log("data: ",data);
    return data;
}
async function deleteUsers(){
    let response = await fetch('https://dummyjson.com/users/1', {
            method: 'DELETE',
          });
    let data = await response.json()
    console.log("data: ",data);
    return data;
}
