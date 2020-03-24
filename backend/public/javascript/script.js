const ajax_request = (method, url, data, cb) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            rtn_data = JSON.parse(xhttp.responseText);
            cb(rtn_data);
        }
    };
    xhttp.open(method, url, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(data);
};


const dispatcher = (rtn_data) => {
    if (rtn_data.type === 'created') {
        add_user(rtn_data.user);
    } else if (rtn_data.type === 'deleted') {
        delete_user(rtn_data.data);
    } else if (rtn_data.type === 'read') {
        render_user(rtn_data.data);
    } else if (rtn_data.type === 'updated') {
        update_user(rtn_data.data);
    }
}

const add_user = (user) => {
    document.getElementById('create-result').innerText = "Created !";
    const node = document.getElementById('display-area');
    let html_list = "";
    html_list += `<tr>
            <th scope="row">${user.name}</th>
            <td>${user.age}</td>
            <td>${user.email}</td>
            </tr>`
    node.insertAdjacentHTML('beforeend', html_list);
};

const delete_user = (data) => {
    window.location.reload();
};



const update_user = (data) => {
    window.location.reload();
};

const init = (data) => {
    if (data.type === 'readAll') {
        const node = document.getElementById('display-area');
        let html_list = "";
        data.users.forEach(user => {
            html_list += `<tr>
            <th scope="row">${user.name}</th>
            <td>${user.age}</td>
            <td>${user.email}</td>
            </tr>`
        });
        node.insertAdjacentHTML('beforeend', html_list);
    }
}

window.onload = () => {
    document.getElementById('create').addEventListener('click', () => {
        const name = document.getElementById('create-name').value;
        const age = document.getElementById('create-age').value;
        const email = document.getElementById('create-email').value;
        ajax_request('POST', './api/user', `mode=create&name=${name}&age=${age}&email=${email}`, dispatcher);
    });
    document.getElementById('update').addEventListener('click', () => {
        const name = document.getElementById('update-name').value;
        const age = document.getElementById('update-age').value;
        const email = document.getElementById('update-email').value;
        ajax_request('POST', './api/user', `mode=update&name=${name}&age=${age}&email=${email}`, dispatcher);
    });
    document.getElementById('delete').addEventListener('click', () => {
        const name = document.getElementById('update-name').value;
        ajax_request('POST', './api/user', `mode=delete&name=${name}`, dispatcher);
    });
    ajax_request('POST', './api/user', `mode=readAll`, init);
};