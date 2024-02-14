const msgErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const msgSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const msgDataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const renderErrorMessage = () => {
  const errorElement = msgErrorTemplate.cloneNode(true);
  errorElement.querySelector('.error__button').addEventListener('click', () => {
    errorElement.remove();
  });
  document.body.appendChild(errorElement);
};

const renderSuccessMessage = () => {
  const successElement = msgSuccessTemplate.cloneNode(true);
  successElement.querySelector('.success__button').addEventListener('click', () => {
    successElement.remove();
  });
  document.body.appendChild(successElement);
};

const renderDataErrorMessage = () => {
  const dataErrorElement = msgDataErrorTemplate.cloneNode(true);
  document.body.appendChild(dataErrorElement);
};

export {renderDataErrorMessage, renderErrorMessage, renderSuccessMessage};
