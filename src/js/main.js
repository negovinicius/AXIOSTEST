const statusEl = document.getElementById('status');
const dataEl = document.getElementById('data');
const headersEl = document.getElementById('headers');
const configEl = document.getElementById('config');

const newAxios = axios.create({
    baseURL: 'https://api.example.com',
    headers: {
        common: {
            Authorization: 'Autorized'
        }
    }
  });

newAxios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

axios.interceptors.request.use(function(config) {
    config.headers.common = {
        Autorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    };
    console.log(config);
    return config;
}, function (error) {
    console.log('erro')
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    console.log('Certo');
    // Qualquer código de status que dentro do limite de 2xx faz com que está função seja acionada
    // Faz alguma coisa com os dados de resposta
    return response;
  }, function (error) {
    console.log('Error');
    // Qualquer código de status que não esteja no limite do código 2xx faz com que está função seja acionada
    // Faz alguma coisa com o erro da resposta
    return Promise.reject(error);
  });

const get = () => {
    const config = {     
        params: {
        _limit: 5
        }
    };
    //newAxios para instacia diferente
    axios.get('posts', config)
    .then((response) => renderOutput(response))
}

const post = () => {
    const data = {
        title: 'Post',
        body: 'Test',
        userId: 1,
        Simulation: 'On'
    };
    axios.post('posts', data)
    .then((response) => renderOutput(response))
}

const put = () => {
    const data = {
        title: 'Put',
        body: 'Test',
        userId: 1,
      };
    axios.put('posts/1', data)
    .then((response) => renderOutput(response))
}

const patch = () => {
    const data = {
        title: 'Path',
      };
    axios.put('posts/1', data)
    .then((response) => renderOutput(response))
}

const del = () => {
    axios.delete('posts/2', data)
    .then((response) => renderOutput(response))
}

const multiple = () => {
    Promise.all([
        axios.get('posts?limit_5'),
        axios.get('users?limit_5')
    ]).then((response) => {
        console.log(response[0]. data)
        console.log(response[1]. data)
    });
}

const transform = () => {
    const config = {     
        params: {
        _limit: 5
        },
        transformResponse: [function (data) {
            const concatData = JSON.parse(data);
            const payload = JSON.parse(data).map(o =>  {
          const firstName = 'Alvaro';
          const lastName = 'Cabral';

          const fullName = `${firstName} ${lastName}`;
          return {
            firstName: firstName,
            lastName: lastName,
            fullName: fullName
          };

        });

            return payload;
          }],
    };
    axios.get('posts', config)
    .then((response) => renderOutput(response))
}

const errorHandling = () => {
    axios.get('postsz')
    .then((response) => renderOutput(response))
    .catch((error) => {
        renderOutput(error.response)
        console.log(error.response)
        console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      console.error('buraco errado parça', error.message);
    });
}

const cancel = () => {
    const controler = new AbortController();
    const config = {     
        params: {
        _limit: 5
        },
        signal: controler.signal
    };
    axios.get('posts', config)
    .then((response) => renderOutput(response))
    .catch((e) => {
        console.log(e.message)
    })

    controler.abort()
}

const clear = () => {
    statusEl.innerHTML = '';
    statusEl.className = '';
    dataEl.innerHTML = '';
    headersEl.innerHTML = '';
    configEl.innerHTML = '';
}

const renderOutput = (response) => {
    // Status
    const status = response.status;
    statusEl.removeAttribute('class');
    let statusElClass = 'inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium';
    if (status >= 500) {
        statusElClass += ' bg-red-100 text-red-800';
    } else if (status >= 400) {
        statusElClass += ' bg-yellow-100 text-yellow-800';
    } else if (status >= 200) {
        statusElClass += ' bg-green-100 text-green-800';
    }

    statusEl.innerHTML = status;
    statusEl.className = statusElClass;

    // Data
    dataEl.innerHTML = JSON.stringify(response.data, null, 2);
    Prism.highlightElement(dataEl);

    // Headers
    headersEl.innerHTML = JSON.stringify(response.headers, null, 2);
    Prism.highlightElement(headersEl);

    // Config
    configEl.innerHTML = JSON.stringify(response.config, null, 2);
    Prism.highlightElement(configEl);
}

document.getElementById('get').addEventListener('click', get);
document.getElementById('post').addEventListener('click', post);
document.getElementById('put').addEventListener('click', put);
document.getElementById('patch').addEventListener('click', patch);
document.getElementById('delete').addEventListener('click', del);
document.getElementById('multiple').addEventListener('click', multiple);
document.getElementById('transform').addEventListener('click', transform);
document.getElementById('cancel').addEventListener('click', cancel);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('clear').addEventListener('click', clear);


