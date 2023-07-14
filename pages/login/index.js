document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();
  
    var username = document.getElementById("user").value;
  
    // Chamar a API do GitHub para verificar se o usuário existe
    await fetch("https://api.github.com/users/" + username)
      .then(response => response.json())
      .then(data => {
        // Verificar se o usuário existe
        if (data.login) {
          // Armazenar informações do usuário no localStorage
          localStorage.setItem("username", data.login);
          localStorage.setItem("avatarUrl", data.avatar_url);
  
          // Login bem-sucedido, redirecionar para a página do usuário
          window.location.href = '/'
        } else {
          document.getElementById("error-message").textContent = "Usuário não encontrado";
        }
      })
      .catch(error => {
        console.error(error);
        document.getElementById("error-message").textContent = "Ocorreu um erro ao consultar a API do GitHub";
      });
  });
 