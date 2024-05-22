document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    const productsBtn = document.getElementById('productsBtn');
    const createBtn = document.getElementById('createBtn');
    const btnsUsers = document.querySelectorAll('.btnEliminar');
    const btnsRol = document.querySelectorAll('.btnRol');
    const deleteAllBtn = document.getElementById('deleteAllBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            const result = await fetch('/api/sessions/logout', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const { redirect } = await result.json();
            window.location.href = redirect || '/login';
        });
    }

    if (productsBtn) {
        productsBtn.addEventListener('click', () => {
            window.location.href = '/products';
        });
    }

    if (createBtn) {
        createBtn.addEventListener('click', () => {
            window.location.href = '/realtimeProducts';
        });
    }

    const deleteUser = async (uId) => {
        try {
            const response = await fetch(`/api/sessions/${uId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200 || response.status === 201) {
                alert('Usuario eliminado correctamente');
            } else {
                alert('Error, no se pudo eliminar el usuario');
            }

        } catch (error) {
            console.error('Hubo un error al realizar la solicitud DELETE:', error)
        }
    }

    const putRole = async (uId, role) =>{
        try{
            const response = await fetch(`/api/sessions/premium/${uId}`, {
                body: JSON.stringify({
                    role: role,
                }),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            })        
            if (response.status === 200 || response.status === 201) {
                alert('Role del Usuario/Premium modificado correctamente');
            } else {
                alert('Error, no se pudo modificar el role del usuario');
            }      
        } catch (error) {
            console.error('Hubo un error al realizar la solicitud POST:', error)
        }
    }    

    const deleteUsers = async () => {
        try {
            const response = await fetch('/api/sessions/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200 || response.status === 201) {
                alert('Fueron eliminados todos los usuarios inactivos correctamente');
            } else {
                alert('Error, no se pudieron eliminar todos los usuarios');
            }
        } catch (error) {
            console.error('Hubo un error al realizar la solicitud DELETE:', error);
        }
    };

    // Agrega un listener a cada botón de eliminar usuario
    btnsUsers.forEach(btn => {
        btn.addEventListener('click', async (event) => {
            event.preventDefault();
            const userId = event.target.id;
            deleteUser(userId);
        });
    });

    // Agrega un listener a cada botón
    btnsRol.forEach(btn => {
        btn.addEventListener('click', async (event) => {
            event.preventDefault()
            const userId = event.target.id;
            const currentrole = event.target.dataset.role;
            if (currentrole !== 'premium') {
                role = 'premium';
            } else {
                role = 'usuario';
            }
            putRole(userId, role);
          })
    });

    // Event listener para eliminar todos los usuarios
    if (deleteAllBtn) {
        deleteAllBtn.addEventListener('click', async () => {
            await deleteUsers();
        });
    }
});
