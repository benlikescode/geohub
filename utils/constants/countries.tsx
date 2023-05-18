const countries = [
  {
    code: 'aw',
    name: 'Aruba',
  },
  {
    code: 'af',
    name: 'Afghanistan',
  },
  {
    code: 'ao',
    name: 'Angola',
  },
  {
    code: 'ai',
    name: 'Anguilla',
  },
  {
    code: 'al',
    name: 'Albania',
  },
  {
    code: 'ad',
    name: 'Andorra',
  },
  {
    code: 'ae',
    name: 'United Arab Emirates',
  },
  {
    code: 'ar',
    name: 'Argentina',
  },
  {
    code: 'am',
    name: 'Armenia',
  },
  {
    code: 'as',
    name: 'American Samoa',
  },
  {
    code: 'aq',
    name: 'Antarctica',
  },
  {
    code: 'tf',
    name: 'French Southern and Antarctic Lands',
  },
  {
    code: 'ag',
    name: 'Antigua and Barbuda',
  },
  {
    code: 'au',
    name: 'Australia',
  },
  {
    code: 'at',
    name: 'Austria',
  },
  {
    code: 'az',
    name: 'Azerbaijan',
  },
  {
    code: 'bi',
    name: 'Burundi',
  },
  {
    code: 'be',
    name: 'Belgium',
  },
  {
    code: 'bj',
    name: 'Benin',
  },
  {
    code: 'bf',
    name: 'Burkina Faso',
  },
  {
    code: 'bd',
    name: 'Bangladesh',
  },
  {
    code: 'bg',
    name: 'Bulgaria',
  },
  {
    code: 'bh',
    name: 'Bahrain',
  },
  {
    code: 'bs',
    name: 'Bahamas',
  },
  {
    code: 'ba',
    name: 'Bosnia and Herzegovina',
  },
  {
    code: 'bl',
    name: 'Saint Barthelemy',
  },
  {
    code: 'by',
    name: 'Belarus',
  },
  {
    code: 'bz',
    name: 'Belize',
  },
  {
    code: 'bm',
    name: 'Bermuda',
  },
  {
    code: 'bo',
    name: 'Bolivia',
  },
  {
    code: 'br',
    name: 'Brazil',
  },
  {
    code: 'bb',
    name: 'Barbados',
  },
  {
    code: 'bn',
    name: 'Brunei',
  },
  {
    code: 'bt',
    name: 'Bhutan',
  },
  {
    code: 'bw',
    name: 'Botswana',
  },
  {
    code: 'cf',
    name: 'Central African Republic',
  },
  {
    code: 'ca',
    name: 'Canada',
  },
  {
    code: 'ch',
    name: 'Switzerland',
  },
  {
    code: 'cl',
    name: 'Chile',
  },
  {
    code: 'cn',
    name: 'China',
  },
  {
    code: 'ci',
    name: "Côte d'Ivoire",
  },
  {
    code: 'cm',
    name: 'Cameroon',
  },
  {
    code: 'cd',
    name: 'Congo',
  },
  {
    code: 'cg',
    name: 'Congo',
  },
  {
    code: 'ck',
    name: 'Cook Islands',
  },
  {
    code: 'co',
    name: 'Colombia',
  },
  {
    code: 'km',
    name: 'Comoros',
  },
  {
    code: 'cv',
    name: 'Cape Verde',
  },
  {
    code: 'cr',
    name: 'Costa Rica',
  },
  {
    code: 'cu',
    name: 'Cuba',
  },
  {
    code: 'cw',
    name: 'Curaçao',
  },
  {
    code: 'ky',
    name: 'Cayman Islands',
  },
  {
    code: 'cy',
    name: 'Cyprus',
  },
  {
    code: 'cz',
    name: 'Czech Republic',
  },
  {
    code: 'de',
    name: 'Germany',
  },
  {
    code: 'dj',
    name: 'Djibouti',
  },
  {
    code: 'dm',
    name: 'Dominica',
  },
  {
    code: 'dk',
    name: 'Denmark',
  },
  {
    code: 'do',
    name: 'Dominican Republic',
  },
  {
    code: 'dz',
    name: 'Algeria',
  },
  {
    code: 'ec',
    name: 'Ecuador',
  },
  {
    code: 'eg',
    name: 'Egypt',
  },
  {
    code: 'er',
    name: 'Eritrea',
  },
  {
    code: 'es',
    name: 'Spain',
  },
  {
    code: 'ee',
    name: 'Estonia',
  },
  {
    code: 'et',
    name: 'Ethiopia',
  },
  {
    code: 'fi',
    name: 'Finland',
  },
  {
    code: 'fj',
    name: 'Fiji',
  },
  {
    code: 'fk',
    name: 'Falkland Islands',
  },
  {
    code: 'fr',
    name: 'France',
  },
  {
    code: 'fo',
    name: 'Faroe Islands',
  },
  {
    code: 'fm',
    name: 'Micronesia',
  },
  {
    code: 'ga',
    name: 'Gabon',
  },
  {
    code: 'gb',
    name: 'United Kingdom',
  },
  {
    code: 'ge',
    name: 'Georgia',
  },
  {
    code: 'gg',
    name: 'Guernsey',
  },
  {
    code: 'gh',
    name: 'Ghana',
  },
  {
    code: 'gi',
    name: 'Gibraltar',
  },
  {
    code: 'gn',
    name: 'Guinea',
  },
  {
    code: 'gm',
    name: 'Gambia',
  },
  {
    code: 'gw',
    name: 'Guinea Bissau',
  },
  {
    code: 'gq',
    name: 'Equatorial Guinea',
  },
  {
    code: 'gr',
    name: 'Greece',
  },
  {
    code: 'gd',
    name: 'Grenada',
  },
  {
    code: 'gl',
    name: 'Greenland',
  },
  {
    code: 'gt',
    name: 'Guatemala',
  },
  {
    code: 'gu',
    name: 'Guam',
  },
  {
    code: 'gy',
    name: 'Guyana',
  },
  {
    code: 'hm',
    name: 'HIMI',
  },
  {
    code: 'hn',
    name: 'Honduras',
  },
  {
    code: 'hr',
    name: 'Croatia',
  },
  {
    code: 'ht',
    name: 'Haiti',
  },
  {
    code: 'hu',
    name: 'Hungary',
  },
  {
    code: 'id',
    name: 'Indonesia',
  },
  {
    code: 'im',
    name: 'Isle of Man',
  },
  {
    code: 'in',
    name: 'India',
  },
  {
    code: 'io',
    name: 'British Indian Ocean Territory',
  },
  {
    code: 'ie',
    name: 'Ireland',
  },
  {
    code: 'ir',
    name: 'Iran',
  },
  {
    code: 'iq',
    name: 'Iraq',
  },
  {
    code: 'is',
    name: 'Iceland',
  },
  {
    code: 'il',
    name: 'Israel',
  },
  {
    code: 'it',
    name: 'Italy',
  },
  {
    code: 'jm',
    name: 'Jamaica',
  },
  {
    code: 'je',
    name: 'Jersey',
  },
  {
    code: 'jo',
    name: 'Jordan',
  },
  {
    code: 'jp',
    name: 'Japan',
  },
  {
    code: 'kz',
    name: 'Kazakhstan',
  },
  {
    code: 'ke',
    name: 'Kenya',
  },
  {
    code: 'kg',
    name: 'Kyrgyzstan',
  },
  {
    code: 'kh',
    name: 'Cambodia',
  },
  {
    code: 'ki',
    name: 'Kiribati',
  },
  {
    code: 'kn',
    name: 'Saint Kitts and Nevis',
  },
  {
    code: 'kr',
    name: 'South Korea',
  },
  {
    code: 'xk',
    name: 'Kosovo',
  },
  {
    code: 'kw',
    name: 'Kuwait',
  },
  {
    code: 'la',
    name: 'Laos',
  },
  {
    code: 'lb',
    name: 'Lebanon',
  },
  {
    code: 'lr',
    name: 'Liberia',
  },
  {
    code: 'ly',
    name: 'Libya',
  },
  {
    code: 'lc',
    name: 'Saint Lucia',
  },
  {
    code: 'li',
    name: 'Liechtenstein',
  },
  {
    code: 'lk',
    name: 'Sri Lanka',
  },
  {
    code: 'ls',
    name: 'Lesotho',
  },
  {
    code: 'lt',
    name: 'Lithuania',
  },
  {
    code: 'lu',
    name: 'Luxembourg',
  },
  {
    code: 'lv',
    name: 'Latvia',
  },
  {
    code: 'mf',
    name: 'Saint Martin',
  },
  {
    code: 'ma',
    name: 'Morocco',
  },
  {
    code: 'mc',
    name: 'Monaco',
  },
  {
    code: 'md',
    name: 'Moldova',
  },
  {
    code: 'mg',
    name: 'Madagascar',
  },
  {
    code: 'mv',
    name: 'Maldives',
  },
  {
    code: 'mx',
    name: 'Mexico',
  },
  {
    code: 'mh',
    name: 'Marshall Islands',
  },
  {
    code: 'mk',
    name: 'North Macedonia',
  },
  {
    code: 'ml',
    name: 'Mali',
  },
  {
    code: 'mt',
    name: 'Malta',
  },
  {
    code: 'mm',
    name: 'Myanmar',
  },
  {
    code: 'me',
    name: 'Montenegro',
  },
  {
    code: 'mn',
    name: 'Mongolia',
  },
  {
    code: 'mp',
    name: 'Northern Mariana Islands',
  },
  {
    code: 'mz',
    name: 'Mozambique',
  },
  {
    code: 'mr',
    name: 'Mauritania',
  },
  {
    code: 'ms',
    name: 'Montserrat',
  },
  {
    code: 'mu',
    name: 'Mauritius',
  },
  {
    code: 'mw',
    name: 'Malawi',
  },
  {
    code: 'my',
    name: 'Malaysia',
  },
  {
    code: 'na',
    name: 'Namibia',
  },
  {
    code: 'nc',
    name: 'New Caledonia',
  },
  {
    code: 'ne',
    name: 'Niger',
  },
  {
    code: 'nf',
    name: 'Norfolk Island',
  },
  {
    code: 'ng',
    name: 'Nigeria',
  },
  {
    code: 'ni',
    name: 'Nicaragua',
  },
  {
    code: 'nu',
    name: 'Niue',
  },
  {
    code: 'nl',
    name: 'Netherlands',
  },
  {
    code: 'no',
    name: 'Norway',
  },
  {
    code: 'np',
    name: 'Nepal',
  },
  {
    code: 'nr',
    name: 'Nauru',
  },
  {
    code: 'nz',
    name: 'New Zealand',
  },
  {
    code: 'om',
    name: 'Oman',
  },
  {
    code: 'pk',
    name: 'Pakistan',
  },
  {
    code: 'pa',
    name: 'Panama',
  },
  {
    code: 'pn',
    name: 'Pitcairn Islands',
  },
  {
    code: 'pe',
    name: 'Peru',
  },
  {
    code: 'ph',
    name: 'Philippines',
  },
  {
    code: 'pw',
    name: 'Palau',
  },
  {
    code: 'pg',
    name: 'Papua New Guinea',
  },
  {
    code: 'pl',
    name: 'Poland',
  },
  {
    code: 'pr',
    name: 'Puerto Rico',
  },
  {
    code: 'kp',
    name: 'North Korea',
  },
  {
    code: 'pt',
    name: 'Portugal',
  },
  {
    code: 'py',
    name: 'Paraguay',
  },
  {
    code: 'pf',
    name: 'French Polynesia',
  },
  {
    code: 'qa',
    name: 'Qatar',
  },
  {
    code: 'ro',
    name: 'Romania',
  },
  {
    code: 'ru',
    name: 'Russia',
  },
  {
    code: 'rw',
    name: 'Rwanda',
  },
  {
    code: 'eh',
    name: 'Western Sahara',
  },
  {
    code: 'sa',
    name: 'Saudi Arabia',
  },
  {
    code: 'sd',
    name: 'Sudan',
  },
  {
    code: 'ss',
    name: 'South Sudan',
  },
  {
    code: 'sn',
    name: 'Senegal',
  },
  {
    code: 'sg',
    name: 'Singapore',
  },
  {
    code: 'gs',
    name: 'South Georgia Island',
  },
  {
    code: 'sh',
    name: 'Saint Helena',
  },
  {
    code: 'sb',
    name: 'Solomon Islands',
  },
  {
    code: 'sl',
    name: 'Sierra Leone',
  },
  {
    code: 'sv',
    name: 'El Salvador',
  },
  {
    code: 'sm',
    name: 'San Marino',
  },
  {
    code: 'so',
    name: 'Somalia',
  },
  {
    code: 'pm',
    name: 'Saint Pierre and Miquelon',
  },
  {
    code: 'rs',
    name: 'Serbia',
  },
  {
    code: 'st',
    name: 'Sao Tome and Principe',
  },
  {
    code: 'sr',
    name: 'Suriname',
  },
  {
    code: 'sk',
    name: 'Slovakia',
  },
  {
    code: 'si',
    name: 'Slovenia',
  },
  {
    code: 'se',
    name: 'Sweden',
  },
  {
    code: 'sz',
    name: 'Eswatini',
  },
  {
    code: 'sx',
    name: 'Sint Maarten',
  },
  {
    code: 'sc',
    name: 'Seychelles',
  },
  {
    code: 'sy',
    name: 'Syria',
  },
  {
    code: 'tc',
    name: 'Turks and Caicos Islands',
  },
  {
    code: 'td',
    name: 'Chad',
  },
  {
    code: 'tg',
    name: 'Togo',
  },
  {
    code: 'th',
    name: 'Thailand',
  },
  {
    code: 'tj',
    name: 'Tajikistan',
  },
  {
    code: 'tm',
    name: 'Turkmenistan',
  },
  {
    code: 'tl',
    name: 'Timor-Leste',
  },
  {
    code: 'to',
    name: 'Tonga',
  },
  {
    code: 'tt',
    name: 'Trinidad and Tobago',
  },
  {
    code: 'tn',
    name: 'Tunisia',
  },
  {
    code: 'tr',
    name: 'Turkey',
  },
  {
    code: 'tv',
    name: 'Tuvalu',
  },
  {
    code: 'tw',
    name: 'Taiwan',
  },
  {
    code: 'tz',
    name: 'Tanzania',
  },
  {
    code: 'ug',
    name: 'Uganda',
  },
  {
    code: 'ua',
    name: 'Ukraine',
  },
  {
    code: 'um',
    name: 'US Minor Outlying Islands',
  },
  {
    code: 'uy',
    name: 'Uruguay',
  },
  {
    code: 'us',
    name: 'United States',
  },
  {
    code: 'uz',
    name: 'Uzbekistan',
  },
  {
    code: 'va',
    name: 'Vatican City',
  },
  {
    code: 'vc',
    name: 'Saint Vincent and the Grenadines',
  },
  {
    code: 've',
    name: 'Venezuela',
  },
  {
    code: 'vg',
    name: 'British Virgin Islands',
  },
  {
    code: 'vi',
    name: 'US Virgin Islands',
  },
  {
    code: 'vn',
    name: 'Vietnam',
  },
  {
    code: 'vu',
    name: 'Vanuatu',
  },
  {
    code: 'wf',
    name: 'Wallis and Futuna',
  },
  {
    code: 'ws',
    name: 'Samoa',
  },
  {
    code: 'ye',
    name: 'Yemen',
  },
  {
    code: 'za',
    name: 'South Africa',
  },
  {
    code: 'zm',
    name: 'Zambia',
  },
  {
    code: 'zw',
    name: 'Zimbabwe',
  },
]

export default countries
