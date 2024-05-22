    const chatBtn = document.getElementById('chatBtn');
    const adminBtn = document.getElementById('adminBtn');
    const currentRole = document.getElementById('currentRole').value;


    // Mostrar el botón de admin si el usuario tiene el rol de admin
    if (currentRole === 'admin') {
        adminBtn.style.display = 'inline-block';
    }

    // Mostrar el botón de admin si el usuario tiene el rol de admin
    if (currentRole !== 'admin') {
        chatBtn.style.display = 'inline-block';
    }
