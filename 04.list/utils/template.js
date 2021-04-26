const list = ({ list }) => {
  return list.map(li => `<li><a href="/?id=${li.title}">${li.title}</a></li>`);
};

const description = ({ title, description }) => {
  return `<h2>${title}</h2><p>${description}</p>`;
};

const form = ({ path, title = '', description = '' }) => `
  <form method="POST" action="${path}">
    <div>
      <input type="hidden" name="id" value="${title}"/>
    </div>

    <div>
      <input type="text" name="title" placeholder="Title" value="${title}"/>
    </div>

    <div>
      <textarea name="description" placeholder="Description">${description}</textarea>
    </div>

    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
`;

const html = ({ title, list, controls = [], contents }) => {
  const controlList = controls.map(control => {
    if (control === 'update') {
      return `<a href="/${control}?id=${title}">${control.toUpperCase()}</a>`;
    }

    if (control === 'delete') {
      return `
        <form method="POST" action="delete-process" onsubmit="return confirm('정말로 삭제하시겠습니까?')">
          <input type="hidden" name="id" value="${title}"/>
          <button>${control.toUpperCase()}</button>
        </form>
      `;
    }

    return `<a href="/${control}">${control.toUpperCase()}</a>`;
  });

  return `
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>${title}</title>
      </head>

      <body>
        <h1>
          <a href="/">WEB</a>
        </h1>

        <ul>
          ${list.join('')}
        </ul>

        <div>
          ${controlList.join(' ')}
        </div>

        ${contents}
      </body>
    </html>
  `;
};

module.exports = { list, description, form, html };
