const SERVER = "https://fancytodo-delvia.herokuapp.com"


$(document).ready(function () {
    const token = localStorage.getItem("token")
    console.log(token)
    
    if(token) {
        $("#content").show()
        $("#login-page").hide()
        $("#btn-logout").show()
        $("#register-page").hide()
        $("#add-todos").show()
        $("#title-todo").show()
        $("#edit-form").hide()
        
        showTodos()
        addNewTodos()
    } else {
        $("#content").hide()
        $("#login-page").show() 
        $("#register-page").hide()
        $("#btn-logout").hide()
        $("#add-todos").hide()
        $("#title").hide()
        $("#title-todo").hide()
        $("#edit-form").hide()
    }
    $("#btn-logout").on("click", function () {
        logout()
    })
})

function addNewTodos() {
    $("#login-page").hide()
    $("#register-page").hide()
    $("#add-todos").show()
    $("#edit-form").hide()
}

function create(e) {
    e.preventDefault()
    const title = $("#title-add").val()
    const description = $("#description").val()
    const status = $("#status").val()
    const due_date = $("#due_date").val()
    //console.log(title)
    $.ajax({
        url: SERVER + "/todos",
        method: "POST",
        headers: {token: localStorage.token},
        data: {title, description, status, due_date}
    }).done( response => {
        //console(response)
        showTodos()
        $("#title-add").val("")
        $("#description").val("")
        $("#status").val("")
        $("#due_date").val("")
        
    }).fail(err => {
        console.log(err)
    })
}

function registerPage() {
    $("#login-page").hide()
    $("#register-page").show()
    register()
}

function loginPage() {
    $("#login-page").show()
    $("#register-page").hide()
    $("#edit-form").hide()
    login(e)
}

function register(e) {
    e.preventDefault()
    $("#login-page").hide()
    $("#register-page").show()
    //console.log('register')
    const email = $("#email-reg").val()
    const password = $("#password-reg").val()
    $.ajax({
        method: "POST",
        url: SERVER + "/register",
        data: {
            email,
            password,
        },
    }).done(response => {
        $("#content").hide()
        $("#btn-logout").hide()
        $("#login-page").show()
        $("#register-page").hide()
        $("#edit-form").hide()
        // Swal.fire({
        //     icon: "success",
        //     title: "Success",
        //     text: "Your account has been registered",
        //   });
    })
    .fail(err => {
        console.log(err)
        Swal.fire({
            icon: "error",
            title: "Error",
            text: err.responseJSON.message,
          })
    })
}

function login(e) {
    e.preventDefault()
    //console.log('login!')
    const email= $("#email").val()
    const password = $("#password").val()

    console.log(email, password)
    $.ajax({
        method: "POST",
        url: SERVER + "/login",
        data: {
            email, 
            password,
        },
    }).done(response => {
        const token = response.tokenAcces
        localStorage.setItem("token", token)
        $("#login-page").hide()
        $("#register-page").hide()
        $("#content").show()
        $("#add-todos").show()
        $("#btn-logout").show()
        $("#email").val("")
        $("#password").val("")
        showTodos()
        addNewTodos()
    }).fail(err => {
        console.log(err)
        Swal.fire({
            icon: "error",
            title: "Error",
            text: err.responseJSON.message,
          })
          $("#email").val("")
          $("#password").val("")
    })
}

function logout() {
    $("#login-page").show()
    $("#content").hide()
    $("#add-todos").hide()
    $("#btn-logout").hide()
    $("#title-todo").hide()
    $("#edit-form").hide()
    localStorage.removeItem('token')

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function showTodos() {
    const token = localStorage.getItem("token")
    $.ajax({
        method: "GET",
        url: SERVER + "/todos",
        headers: {
            token: token
        }
    }).done(response => {
        const todos = response.todos
        console.log(todos)
        $("#title-todo").show()
        $("#content").empty()
        todos.forEach(el => {

            $("#content").append(`
            
                <div class="col-6 mt-5 md-3">
                    <p class="text-left font-weight-bold">${el.title}</p>
                    <p class="text-left font-weight-bold">${el.description}</p>
                    <p class="text-left font-weight-bold">${el.status}</p>
                    <p class="text-left font-weight-bold">${el.due_date}</p>
                    <button type="submit" class="btn btn-primary" style="background-color: blue;" onclick="editTodos(${el.id},'${el.title}', '${el.description}','${el.status}', '${el.due_date}')">Edit</button>
                    <button type="submit" class="btn btn-primary" style="background-color: red;" onClick="deleteTodos(${el.id})">Delete</button>
                </div>
            `)
        })
        console.log(todos)
    }).fail(err => {
        console.log(err)
        Swal.fire({
            icon: "error",
            title: "Error",
            text: err.responseJSON.message,
          })
    })
}

function edit(e) {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const title = $("#edit-title").val()
    const description = $("#edit-description").val()
    const status = $("#edit-status").val()
    const due_date = $("#edit-due_date").val()
    const id = $("#id").val()
    $.ajax({
        url: SERVER + "/todos/" + id,
        method: "PUT",
        headers: {token},
        data: {title, description, status, due_date}
    }).done(response => {
        $("#content").show()
        $("#login-page").hide()
        $("#btn-logout").show()
        $("#register-page").hide()
        $("#add-todos").show()
        $("#title-todo").show()
        $("#edit-form").hide()
        showTodos()
        $("edit-form").trigger('reset')


    }).fail(err => {
        console.log(err)
        Swal.fire({
            icon: "error",
            title: "Error",
            text: err.responseJSON.message,
          })
    })
}

function editTodos(id,title,description,status,due_date) {
    console.log(id,title,description,status,due_date)
    $("#content").hide()
    $("#edit-form").show()
    $("#add-todos").hide()
    $("#title-todo").hide()
    
    $("#edit-title").val(title)
    $("#edit-description").val(description)
    $("#edit-status").val(status)
    $("#edit-due_date").val(new Date(due_date).toISOString().slice(0,10))
    $("#id").val(id)
}


function deleteTodos(id) {
    //console.log(id, 'ini id')
    const token = localStorage.getItem("token")
    $.ajax({
        url: SERVER + "/todos/" + id,
        method: "DELETE",
        headers: {token}
    }).done(response => {
        $("#content").show()
        showTodos()
    }).fail(err => {
        console.log(err)
    })
}

function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token;
    //console.log(google_access_token);

    $.ajax({
        method: "POST",
        url: SERVER + "/googleLogin",
        data: {
            google_access_token
        }
    })
        .done(response => {
            console.log(response, 'ini res google')
            localStorage.setItem("token", response.token)
            //console.log(response.token);
            $("#content").show()
            $("#login-page").hide()
            $("#btn-logout").show()
            $("#register-page").hide()
            $("#add-todos").show()
            $("#title-todo").show()
            $("#edit-form").hide()
            showTodos()
            })
        .fail(err => {
            console.log(err, 'ini error google');
        })
}




