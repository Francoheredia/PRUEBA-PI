export const validate = (form) => {
  let errors = {};
  if (!form.name) {
    errors.name = 'Name required';
  } else if (!form.summary) {
    errors.summary = 'Summary is required';
  } else if (!form.steps) {
    errors.steps = 'Steps is required';
  } else if (!form.score) {
    errors.score = 'The score is required';
  } else if (form.score > 100) {
    errors.score = 'The score cannot be higher than one hundred.';
  } else if (!form.healthScore) {
    errors.healthScore = 'The health score is required';
  } else if (form.healthScore > 100) {
    errors.healthScore = 'The health score cannot be higher than one hundred.';
  } else if (!form.image) {
    errors.image = 'The image is required';
  } else if (form.diets.length === 0) {
    errors.diets = 'requires at least one recipe';
  }

  return errors;
};
