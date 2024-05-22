const cId = document.getElementById('cId').value;
const btns = document.querySelectorAll('#pId');
const logoutBtn = document.getElementById('logoutBtn');

const addProductToCart = async (pId) => {
    try {
        if (!cId) {
            alert('No se ha proporcionado el ID del carrito');
            return;
        }
        const result = await fetch(`/api/carts/${cId}/product/${pId}`, {
            body: JSON.stringify({
                quantity: 1
            }),
            method: 'post',
            headers: {
               'Content-Type': 'application/json' 
            }
        });
        if(result.status === 200 || result.status === 201) {
            alert('Se agregó correctamente');
        } else {
            alert('Error, no se pudo agregar');
        }
    } catch (error) {
        alert('Error, no se pudo agregar');
    }
}

btns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        addProductToCart(btn.value);
    })
});

logoutBtn.addEventListener('click', async (e) => {
    const result = await fetch('/api/sessions/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const {redirect} = await result.json();
    window.location.href = redirect;
});