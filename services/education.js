const { writeToFile, readFile, idGen } = require("../utils");

const educationService = {
	educationPath: "./data/education.json",
	readEducation: async function () {
		try {
			const data = await readFile(this.educationPath);
			return JSON.parse(data);
		} catch (e) {
			throw new Error(e);
		}
	},
	writeEducation: async function (body) {
		try {
			const data = await this.readEducation();
			const id = idGen(data.length);
			data.push({ id, ...body });
			const newData = JSON.stringify(data);
			await writeToFile(newData, this.educationPath);
			return body;
		} catch (e) {
			throw new Error(e);
		}
	},
};

module.exports = educationService;
