export const nameList = [
	'Zoltán Balázs',
	'Lauren Bertolini',
	'István Bodnár',
	'Márton Borlay',
	'Steve Climaco',
	'Michelle Chiang',
	'Ernie Deeb',
	'Ashton Galloway-Taylor',
	'János Hardi',
	'Michael Scott Hertzberg',
	'László Heves',
	'Viktor Honti',
	'Etele Illés',
	'Zoltán Kalmár',
	'Balázs Kéki',
	'Olivér Kovács',
	'Dmitry Lambrianov',
	'Josh Laurito',
	'Mikhail Mitrofanov',
	'Levente Molnar',
	'Kelly Monson',
	'Gergő Nagy',
	'Tamás Neltz',
	'Luca Németh',
	'Claire Neveu',
	'Ali Philippides',
	'Krisztián Pintér',
	'Balázs Pőcze',
	'Ben Regenspan',
	'Grace Robertson',
	'Csaba Schreiner',
	'András Szatmári',
	'Péter Szász',
	'Margaret Taormina',
	'Endre Ujhelyi',
	'Jim Bartus',
	'Gyorgy Bokros',
	'Tibor Botos',
	'Long Cao',
	'Jeremy Chase',
	'Stuart Cheshire',
	'Dustin Curtis',
	'Ian Fette',
	'Kevin Graham',
	'Kanwar Kultar Gill',
	'Matt Hamer',
	'Peter Hausel',
	'János Hegymegi',
	'Peri Hochwald',
	'Adam Homolya',
	'Stephen Kao',
	'József Kozma',
	'Gáspár Körtesi',
	'Peter László',
	'Kyle Lucovsky',
	'Gábor Luk',
	'Eric Mittelhammer',
	'Ferenc Nehéz-Posony',
	'Diego Pineda',
	'Erin Pettigrew',
	'Tom Plunkett',
	'Justin Potter',
	'Chloe Powell',
	'Pedro Rodriguez',
	'Nandor Sivok',
	'Julia Skrak',
	'Jessica Smith',
	'Casey Speer',
	'Jory Steifel',
	'Gergely Szabó',
	'Mikołaj Ziemowit Szabó',
	'Greg Takayama',
	'Alexandre Thomas',
	'David Tobin',
	'Ferenc Tóth',
	'Ariel Viera'
];

export default nameList.map((author, index) => ({
	avatar: {
		format: 'png',
		id: '17jcxk0ml1k8qpng'
	},
	displayName: author,
	id: index * 30000,
	screenName: author.toLowerCase().replace(/[^a-z\d]+/g, '')
}));