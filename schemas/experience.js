const Joi = require("joi");

const keyNames = ["company_name", "position", "from_date", "to_date"];
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
	experienceUpdate: Joi.object({
		id: Joi.number().required(),
		company_name: Joi.string().optional(),
		position: Joi.string().optional(),
		from_date: Joi.string()
			.pattern(/^\d\d\/\d\d$/i)
			.optional(),
		to_date: Joi.string()
			.pattern(/^\d\d\/\d\d$/i)
			.allow("Present")
			.optional(),
	}).or(...keyNames),
	experienceDelete: Joi.object().keys({
		id: Joi.number().required(),
	}),
};

module.exports = schemas;
