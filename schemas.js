const Joi = require("joi");

const schemas = {
	experienceAdd: Joi.object({
		company_name: Joi.string().required(),
		position: Joi.string().required(),
		from_date: Joi.string()
			.pattern(/^\d\d\/\d\d$/i)
			.required(),
		to_date: Joi.string()
			.pattern(/^\d\d\/\d\d$/i)
			.allow("Present")
			.required(),
	}),
};

module.exports = schemas;
