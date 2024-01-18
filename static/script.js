$(document).ready(function () {
    $('#todoForm').submit(function (e) {
        e.preventDefault();
        addTodo();
    });
    getTodos();
});

function getTodos() {
    $.get("/todos", function (data) {
        displayTodos(data);
    });
}

function addTodo() {
    var title = $('#title').val();
    console.log(title);
    var requestData = {
        Title: title,
        Completed: false
    };
    sendAddRequest('/createTodo', requestData)
 
}

function sendAddRequest(endpoint, data) {
    $.ajax({
        type: 'POST',
        url: endpoint,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
            getTodos();
            $('#title').val('');
        },
        error: function (error) {
            console.error('Error creating todo:', error);
        }
    });
}

function displayTodos(todos) {
    var todoList = $('#displayData');
    todoList.empty();
    var todosJSON = JSON.parse(todos);

    todosJSON.forEach(function (todo) {
        console.log(todo.ID);

        var todoItem = $('<div class="alert alert-primary d-flex justify-content-between" role="alert">' + 
                            '<div class="col">' + todo.Title + '</div>' +
                            '<div class="col d-flex justify-content-end">' +
                                '<button class="btn btn-success btn-sm me-2">Resolve</button>' +
                                '<button class="text-end btn btn-warning btn-sm" data-toggle="modal" data-target="#updateModal">Update</button>' +
                            '</div>' +
                        '</div>');

        todoItem.find('.btn-success').on('click', function () {
            sendDeleteRequest('/deleteTodo/' + todo.ID);
            todoItem.remove();
        });

        todoItem.find('.btn-warning').on('click', function() {
            updateTodo(todo);
        });

        todoList.append(todoItem);
    });
}


function sendDeleteRequest(endpoint, data) {
    $.ajax({
        type: 'DELETE',
        url: endpoint,
        contentType: 'application/json',
        success: function(response) {
            console.log('Todo deleted successfully');
        },
        error: function(error) {
            console.error('Error deleting todo:', error);
        }
    });
}

function updateTodo(todo) {
    var modal = $('#updateModal');
    modal.find('#todoTitle').val(todo.Title);
    modal.find('#saveButton').on('click', function() {
        var updatedTitle = modal.find('#todoTitle').val();
        sendUpdateRequest('/updateTodo/' + todo.ID, { Title: updatedTitle });
        modal.modal('hide');
    });
}

function sendUpdateRequest(endpoint, data) {
    $.ajax({
        type: 'POST',
        url: endpoint,
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(response) {
            console.log('Todo updated successfully');
        },
        error: function(error) {
            console.error('Error updating todo:', error);
        }
    });
}


