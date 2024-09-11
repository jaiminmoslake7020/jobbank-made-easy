import Joi from 'joi';

// Custom date format validation
export const customDateFormat = Joi.string()
  .regex(
    /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}$/,
  )
  .custom((value, helpers) => {

    // Parse the date string
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return helpers.message({
        date: 'Invalid date',
      });
    }

    // Check if the month, day, and year match the original input
    const [month, day, year] = value.split(' ');
    const parsedMonth = date.toLocaleString('default', { month: 'long' });
    const parsedDay = date.getDate();
    const parsedYear = date.getFullYear();

    if (
      parsedMonth !== month ||
      parsedDay !== parseInt(day.replace(',', '')) ||
      parsedYear !== parseInt(year)
    ) {
      return helpers.message({
        date: 'Invalid date',
      });
    }

    return value;
  });

export const validateDate = (date: string) => {
  if (date) {
    // Define a schema for the date validation
    const schema = Joi.object({
      date: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required()
        .messages({
          'string.pattern.base': 'Date must be in the format YYYY-MM-DD.',
          'any.required': 'Date is required.',
        }),
    });
    // Validate the data against the schema
    const { error, value } = schema.validate({
      date,
    });
    if (error) {
      console.error('Validation error:', error.details);
      return null;
    } else {
      return value.date;
    }
  }
  return null;
};

export const validateDateCustomFormat = (date: string) => {
  if (date) {
    // Define a schema for the date validation
    const schema = Joi.object({
      date: customDateFormat.required(),
    });
    // Validate the data against the schema
    const { error, value } = schema.validate({
      date,
    });
    if (error) {
      console.error('Validation error:', error.details, value);
      return null;
    } else {
      return value.date;
    }
  }
  return null;
};
