const Joi = require("joi");

const keyNames = ["company_name", "position", "from_date", "to_date"];
const schemas = {
	educationAdd: Joi.object({
		institution: Joi.string().required(),
		school: Joi.string().optional(),
		degree_certification: Joi.string().required(),
		year_completed: Joi.number()
			.max(new Date().getFullYear())
			.positive()
			.required(),
	}),
};

module.exports = schemas;
