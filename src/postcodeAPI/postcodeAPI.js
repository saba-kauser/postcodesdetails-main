export const getPostCodes = async (postCode) => {
  try {
    const response = await fetch(
      "http://api.postcodes.io/postcodes/" + postCode
    );
    if (response.ok) {
      const postCodedata = await response.json();
      return postCodedata;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getNearestPostCodes = async (postCode) => {
  try {
    const response = await fetch(
      "http://api.postcodes.io/postcodes/" + postCode + "/nearest"
    );
    if (response.ok) {
      const nearestPostCodedata = await response.json();
      return nearestPostCodedata;
    }
  } catch (error) {
    console.log(error);
  }
};

export const postcodeValidation = async (postCode) => {
  try {
    const response = await fetch(
      "http://api.postcodes.io/postcodes/" + postCode + "/validate"
    );
    if (response.ok) {
      const validationData = await response.json();
      return validationData;
    }
  } catch (error) {
    console.log(error);
  }
};
