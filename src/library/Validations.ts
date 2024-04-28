/* eslint-disable no-useless-escape */
const LettersOnly = (value: string) => {
  if (!value?.length) {
    return false;
  }
  if (
    value
      ?.toString()
      ?.toString()
      ?.match(
        /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
      )
  ) {
    return false;
  }
  const letters = /^[A-Za-z]+$/;
  if (value?.toString()?.match(letters)) {
    return true;
  } else {
    return false;
  }
};

const NumbersOnly = (value: any) => {
  if (!value.length) {
    return false;
  }

  if (value.match(/^[0-9]+$/)) {
    return true;
  } else {
    return false;
  }
};

const Email = (value: string) => {
  if (!value?.length || value?.length > 50) {
    return false;
  }
  if (
    value
      ?.toString()
      ?.match(
        /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
      )
  ) {
    return false;
  }
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (
    (value?.toString()?.match(mailformat) &&
      (value?.toString()?.endsWith("@gmail.com") ||
        value?.toString()?.endsWith("@yahoo.com") ||
        value?.toString()?.endsWith("@hotmail.com") ||
        value?.toString()?.endsWith("@outlook.com"))) ||
    value?.toString()?.endsWith("@live.com") ||
    value?.toString()?.endsWith("@protonmail.com") ||
    value?.toString()?.endsWith("@icloud.com") ||
    value?.toString()?.endsWith("@aol.com") ||
    value?.toString()?.endsWith("@mail.com") ||
    value?.toString()?.endsWith("@zoho.com")
  ) {
    return true;
  } else {
    return false;
  }
};

const NameOnly = (value: string) => {
  if (!value?.length || value?.length > 30) {
    return false;
  }
  if (
    value
      ?.toString()
      ?.match(
        /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
      )
  ) {
    return false;
  }
  const regName = /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  //@ts-ignore
  if (regName.test(value)) {
    return true;
  } else {
    return false;
  }
};

const DescriptionOnly = (value: string) => {
  if (
    value
      ?.toString()
      ?.match(
        /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
      )
  ) {
    return false;
  }
  const regName = /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  //@ts-ignore
  if (regName.test(value)) {
    return true;
  } else {
    return false;
  }
};

const Phone = (value: string) => {
  if (!value?.length) {
    return false;
  }
  if (
    value?.toString()?.match(/^\d{8}$/) ||
    value?.toString()?.match(/^\d{9}$/) ||
    value?.toString()?.match(/^\d{10}$/) ||
    value?.toString()?.match(/^\d{11}$/) ||
    value?.toString()?.match(/^\d{12}$/) ||
    value?.toString()?.match(/^\d{13}$/) ||
    value?.toString()?.match(/^\d{14}$/)
  ) {
    return true;
  } else {
    return false;
  }
};

const SpecialChars = (value: string) => {
  if (!value?.length) {
    return false;
  }
  if (
    value
      ?.toString()
      ?.match(
        /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
      )
  ) {
    return false;
  }
  const charsValidations = /[`'!@#$%^&*()_+\-=\[\]{};:"\\|,<>\/?~]/;
  return charsValidations.test(value);
};

const Currency = (value = "0.42") => {
  const p =
    /^[-]?([1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|\.[0-9]{1,2})$/;

  return p.test(value?.toString());
};

const Validations = {
  LettersOnly,
  Email,
  NameOnly,
  NumbersOnly,
  Phone,
  SpecialChars,
  Currency,
  DescriptionOnly,
};

export default Validations;
