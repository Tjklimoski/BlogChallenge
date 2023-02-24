
const date = new Date();

function dateAsString() {

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };
 
  // first argument is locale, undefined will use the users default locale
  return date.toLocaleDateString(undefined, options);
}

function getDay() {

  const options = {
    weekday: 'long'
  };

  return date.toLocaleDateString(undefined, options);
}

export { dateAsString as getDate };