import React, {useState, useEffect, useRef} from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {Globe, MapPin} from 'lucide-react';
import CodeExample from './CodeExample';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Timezone {
  value: string;
  label: string;
  offset: string;
}

const TimezoneConverter: React.FC = () => {
  const [inputDate, setInputDate] = useState(dayjs().format('YYYY-MM-DDTHH:mm'));
  const [fromTimezone, setFromTimezone] = useState('America/New_York');
  const [toTimezone, setToTimezone] = useState('Asia/Tokyo');
  const [timezones, setTimezones] = useState<Timezone[]>([]);
  const [fromSearchQuery, setFromSearchQuery] = useState('');
  const [toSearchQuery, setToSearchQuery] = useState('');
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);

  // Timestamp converter states
  const [timestamp, setTimestamp] = useState('');
  const [timestampType, setTimestampType] = useState<'seconds' | 'milliseconds'>('seconds');
  const [timestampTimezone, setTimestampTimezone] = useState('UTC');
  const [timestampDropdownOpen, setTimestampDropdownOpen] = useState(false);
  const [timestampSearchQuery, setTimestampSearchQuery] = useState('');
  const timestampDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create and format the timezone list
    const timezonesList = [
      "Africa/Abidjan", "Africa/Accra", "Africa/Addis_Ababa", "Africa/Algiers", "Africa/Asmara",
      "Africa/Asmera", "Africa/Bamako", "Africa/Bangui", "Africa/Banjul", "Africa/Bissau",
      "Africa/Blantyre", "Africa/Brazzaville", "Africa/Bujumbura", "Africa/Cairo", "Africa/Casablanca",
      "Africa/Ceuta", "Africa/Conakry", "Africa/Dakar", "Africa/Dar_es_Salaam", "Africa/Djibouti",
      "Africa/Douala", "Africa/El_Aaiun", "Africa/Freetown", "Africa/Gaborone", "Africa/Harare",
      "Africa/Johannesburg", "Africa/Juba", "Africa/Kampala", "Africa/Khartoum", "Africa/Kigali",
      "Africa/Kinshasa", "Africa/Lagos", "Africa/Libreville", "Africa/Lome", "Africa/Luanda",
      "Africa/Lubumbashi", "Africa/Lusaka", "Africa/Malabo", "Africa/Maputo", "Africa/Maseru",
      "Africa/Mbabane", "Africa/Mogadishu", "Africa/Monrovia", "Africa/Nairobi", "Africa/Ndjamena",
      "Africa/Niamey", "Africa/Nouakchott", "Africa/Ouagadougou", "Africa/Porto-Novo", "Africa/Sao_Tome",
      "Africa/Timbuktu", "Africa/Tripoli", "Africa/Tunis", "Africa/Windhoek",
      "America/Adak", "America/Anchorage", "America/Anguilla", "America/Antigua", "America/Araguaina",
      "America/Argentina/Buenos_Aires", "America/Argentina/Catamarca", "America/Argentina/ComodRivadavia",
      "America/Argentina/Cordoba", "America/Argentina/Jujuy", "America/Argentina/La_Rioja",
      "America/Argentina/Mendoza", "America/Argentina/Rio_Gallegos", "America/Argentina/Salta",
      "America/Argentina/San_Juan", "America/Argentina/San_Luis", "America/Argentina/Tucuman",
      "America/Argentina/Ushuaia", "America/Aruba", "America/Asuncion", "America/Atikokan",
      "America/Atka", "America/Bahia", "America/Bahia_Banderas", "America/Barbados", "America/Belem",
      "America/Belize", "America/Blanc-Sablon", "America/Boa_Vista", "America/Bogota", "America/Boise",
      "America/Buenos_Aires", "America/Cambridge_Bay", "America/Campo_Grande", "America/Cancun",
      "America/Caracas", "America/Catamarca", "America/Cayenne", "America/Cayman", "America/Chicago",
      "America/Chihuahua", "America/Ciudad_Juarez", "America/Coral_Harbour", "America/Cordoba",
      "America/Costa_Rica", "America/Creston", "America/Cuiaba", "America/Curacao", "America/Danmarkshavn",
      "America/Dawson", "America/Dawson_Creek", "America/Denver", "America/Detroit", "America/Dominica",
      "America/Edmonton", "America/Eirunepe", "America/El_Salvador", "America/Ensenada", "America/Fort_Nelson",
      "America/Fort_Wayne", "America/Fortaleza", "America/Glace_Bay", "America/Godthab", "America/Goose_Bay",
      "America/Grand_Turk", "America/Grenada", "America/Guadeloupe", "America/Guatemala", "America/Guayaquil",
      "America/Guyana", "America/Halifax", "America/Havana", "America/Hermosillo", "America/Indiana/Indianapolis",
      "America/Indiana/Knox", "America/Indiana/Marengo", "America/Indiana/Petersburg", "America/Indiana/Tell_City",
      "America/Indiana/Vevay", "America/Indiana/Vincennes", "America/Indiana/Winamac", "America/Indianapolis",
      "America/Inuvik", "America/Iqaluit", "America/Jamaica", "America/Jujuy", "America/Juneau",
      "America/Kentucky/Louisville", "America/Kentucky/Monticello", "America/Knox_IN", "America/Kralendijk",
      "America/La_Paz", "America/Lima", "America/Los_Angeles", "America/Louisville", "America/Lower_Princes",
      "America/Maceio", "America/Managua", "America/Manaus", "America/Marigot", "America/Martinique",
      "America/Matamoros", "America/Mazatlan", "America/Mendoza", "America/Menominee", "America/Merida",
      "America/Metlakatla", "America/Mexico_City", "America/Miquelon", "America/Moncton", "America/Monterrey",
      "America/Montevideo", "America/Montreal", "America/Montserrat", "America/Nassau", "America/New_York",
      "America/Nipigon", "America/Nome", "America/Noronha", "America/North_Dakota/Beulah",
      "America/North_Dakota/Center", "America/North_Dakota/New_Salem", "America/Nuuk", "America/Ojinaga",
      "America/Panama", "America/Pangnirtung", "America/Paramaribo", "America/Phoenix", "America/Port-au-Prince",
      "America/Port_of_Spain", "America/Porto_Acre", "America/Porto_Velho", "America/Puerto_Rico",
      "America/Punta_Arenas", "America/Rainy_River", "America/Rankin_Inlet", "America/Recife", "America/Regina",
      "America/Resolute", "America/Rio_Branco", "America/Rosario", "America/Santa_Isabel", "America/Santarem",
      "America/Santiago", "America/Santo_Domingo", "America/Sao_Paulo", "America/Scoresbysund", "America/Shiprock",
      "America/Sitka", "America/St_Barthelemy", "America/St_Johns", "America/St_Kitts", "America/St_Lucia",
      "America/St_Thomas", "America/St_Vincent", "America/Swift_Current", "America/Tegucigalpa", "America/Thule",
      "America/Thunder_Bay", "America/Tijuana", "America/Toronto", "America/Tortola", "America/Vancouver",
      "America/Virgin", "America/Whitehorse", "America/Winnipeg", "America/Yakutat", "America/Yellowknife",
      "Antarctica/Casey", "Antarctica/Davis", "Antarctica/DumontDUrville", "Antarctica/Macquarie",
      "Antarctica/Mawson", "Antarctica/McMurdo", "Antarctica/Palmer", "Antarctica/Rothera",
      "Antarctica/South_Pole", "Antarctica/Syowa", "Antarctica/Troll", "Antarctica/Vostok",
      "Arctic/Longyearbyen",
      "Asia/Aden", "Asia/Almaty", "Asia/Amman", "Asia/Anadyr", "Asia/Aqtau", "Asia/Aqtobe", "Asia/Ashgabat",
      "Asia/Ashkhabad", "Asia/Atyrau", "Asia/Baghdad", "Asia/Bahrain", "Asia/Baku", "Asia/Bangkok",
      "Asia/Barnaul", "Asia/Beirut", "Asia/Bishkek", "Asia/Brunei", "Asia/Calcutta", "Asia/Chita",
      "Asia/Choibalsan", "Asia/Chongqing", "Asia/Chungking", "Asia/Colombo", "Asia/Dacca", "Asia/Damascus",
      "Asia/Dhaka", "Asia/Dili", "Asia/Dubai", "Asia/Dushanbe", "Asia/Famagusta", "Asia/Gaza", "Asia/Harbin",
      "Asia/Hebron", "Asia/Ho_Chi_Minh", "Asia/Hong_Kong", "Asia/Hovd", "Asia/Irkutsk", "Asia/Istanbul",
      "Asia/Jakarta", "Asia/Jayapura", "Asia/Jerusalem", "Asia/Kabul", "Asia/Kamchatka", "Asia/Karachi",
      "Asia/Kashgar", "Asia/Kathmandu", "Asia/Katmandu", "Asia/Khandyga", "Asia/Kolkata", "Asia/Krasnoyarsk",
      "Asia/Kuala_Lumpur", "Asia/Kuching", "Asia/Kuwait", "Asia/Macao", "Asia/Macau", "Asia/Magadan",
      "Asia/Makassar", "Asia/Manila", "Asia/Muscat", "Asia/Nicosia", "Asia/Novokuznetsk", "Asia/Novosibirsk",
      "Asia/Omsk", "Asia/Oral", "Asia/Phnom_Penh", "Asia/Pontianak", "Asia/Pyongyang", "Asia/Qatar",
      "Asia/Qostanay", "Asia/Qyzylorda", "Asia/Rangoon", "Asia/Riyadh", "Asia/Saigon", "Asia/Sakhalin",
      "Asia/Samarkand", "Asia/Seoul", "Asia/Shanghai", "Asia/Singapore", "Asia/Srednekolymsk", "Asia/Taipei",
      "Asia/Tashkent", "Asia/Tbilisi", "Asia/Tehran", "Asia/Tel_Aviv", "Asia/Thimbu", "Asia/Thimphu",
      "Asia/Tokyo", "Asia/Tomsk", "Asia/Ujung_Pandang", "Asia/Ulaanbaatar", "Asia/Ulan_Bator", "Asia/Urumqi",
      "Asia/Ust-Nera", "Asia/Vientiane", "Asia/Vladivostok", "Asia/Yakutsk", "Asia/Yangon", "Asia/Yekaterinburg",
      "Asia/Yerevan",
      "Atlantic/Azores", "Atlantic/Bermuda", "Atlantic/Canary", "Atlantic/Cape_Verde", "Atlantic/Faeroe",
      "Atlantic/Faroe", "Atlantic/Jan_Mayen", "Atlantic/Madeira", "Atlantic/Reykjavik", "Atlantic/South_Georgia",
      "Atlantic/St_Helena", "Atlantic/Stanley",
      "Australia/ACT", "Australia/Adelaide", "Australia/Brisbane", "Australia/Broken_Hill", "Australia/Canberra",
      "Australia/Currie", "Australia/Darwin", "Australia/Eucla", "Australia/Hobart", "Australia/LHI",
      "Australia/Lindeman", "Australia/Lord_Howe", "Australia/Melbourne", "Australia/NSW", "Australia/North",
      "Australia/Perth", "Australia/Queensland", "Australia/South", "Australia/Sydney", "Australia/Tasmania",
      "Australia/Victoria", "Australia/West", "Australia/Yancowinna",
      "Brazil/Acre", "Brazil/DeNoronha", "Brazil/East", "Brazil/West",
      "CET", "CST6CDT",
      "Canada/Atlantic", "Canada/Central", "Canada/Eastern", "Canada/Mountain", "Canada/Newfoundland",
      "Canada/Pacific", "Canada/Saskatchewan", "Canada/Yukon",
      "Chile/Continental", "Chile/EasterIsland",
      "Cuba", "EET", "EST", "EST5EDT", "Egypt", "Eire",
      "Etc/GMT", "Etc/GMT+0", "Etc/GMT+1", "Etc/GMT+10", "Etc/GMT+11", "Etc/GMT+12", "Etc/GMT+2", "Etc/GMT+3",
      "Etc/GMT+4", "Etc/GMT+5", "Etc/GMT+6", "Etc/GMT+7", "Etc/GMT+8", "Etc/GMT+9", "Etc/GMT-0", "Etc/GMT-1",
      "Etc/GMT-10", "Etc/GMT-11", "Etc/GMT-12", "Etc/GMT-13", "Etc/GMT-14", "Etc/GMT-2", "Etc/GMT-3",
      "Etc/GMT-4", "Etc/GMT-5", "Etc/GMT-6", "Etc/GMT-7", "Etc/GMT-8", "Etc/GMT-9", "Etc/GMT0",
      "Etc/Greenwich", "Etc/UCT", "Etc/UTC", "Etc/Universal", "Etc/Zulu",
      "Europe/Amsterdam", "Europe/Andorra", "Europe/Astrakhan", "Europe/Athens", "Europe/Belfast",
      "Europe/Belgrade", "Europe/Berlin", "Europe/Bratislava", "Europe/Brussels", "Europe/Bucharest",
      "Europe/Budapest", "Europe/Busingen", "Europe/Chisinau", "Europe/Copenhagen", "Europe/Dublin",
      "Europe/Gibraltar", "Europe/Guernsey", "Europe/Helsinki", "Europe/Isle_of_Man", "Europe/Istanbul",
      "Europe/Jersey", "Europe/Kaliningrad", "Europe/Kiev", "Europe/Kirov", "Europe/Kyiv", "Europe/Lisbon",
      "Europe/Ljubljana", "Europe/London", "Europe/Luxembourg", "Europe/Madrid", "Europe/Malta",
      "Europe/Mariehamn", "Europe/Minsk", "Europe/Monaco", "Europe/Moscow", "Europe/Nicosia", "Europe/Oslo",
      "Europe/Paris", "Europe/Podgorica", "Europe/Prague", "Europe/Riga", "Europe/Rome", "Europe/Samara",
      "Europe/San_Marino", "Europe/Sarajevo", "Europe/Saratov", "Europe/Simferopol", "Europe/Skopje",
      "Europe/Sofia", "Europe/Stockholm", "Europe/Tallinn", "Europe/Tirane", "Europe/Tiraspol",
      "Europe/Ulyanovsk", "Europe/Uzhgorod", "Europe/Vaduz", "Europe/Vatican", "Europe/Vienna",
      "Europe/Vilnius", "Europe/Volgograd", "Europe/Warsaw", "Europe/Zagreb", "Europe/Zaporozhye",
      "Europe/Zurich",
      "GB", "GB-Eire", "GMT", "GMT+0", "GMT-0", "GMT0", "Greenwich", "HST", "Hongkong", "Iceland",
      "Indian/Antananarivo", "Indian/Chagos", "Indian/Christmas", "Indian/Cocos", "Indian/Comoro",
      "Indian/Kerguelen", "Indian/Mahe", "Indian/Maldives", "Indian/Mauritius", "Indian/Mayotte",
      "Indian/Reunion",
      "Iran", "Israel", "Jamaica", "Japan", "Kwajalein", "Libya", "MET", "MST", "MST7MDT",
      "Mexico/BajaNorte", "Mexico/BajaSur", "Mexico/General",
      "NZ", "NZ-CHAT", "Navajo", "PRC", "PST8PDT",
      "Pacific/Apia", "Pacific/Auckland", "Pacific/Bougainville", "Pacific/Chatham", "Pacific/Chuuk",
      "Pacific/Easter", "Pacific/Efate", "Pacific/Enderbury", "Pacific/Fakaofo", "Pacific/Fiji",
      "Pacific/Funafuti", "Pacific/Galapagos", "Pacific/Gambier", "Pacific/Guadalcanal", "Pacific/Guam",
      "Pacific/Honolulu", "Pacific/Johnston", "Pacific/Kanton", "Pacific/Kiritimati", "Pacific/Kosrae",
      "Pacific/Kwajalein", "Pacific/Majuro", "Pacific/Marquesas", "Pacific/Midway", "Pacific/Nauru",
      "Pacific/Niue", "Pacific/Norfolk", "Pacific/Noumea", "Pacific/Pago_Pago", "Pacific/Palau",
      "Pacific/Pitcairn", "Pacific/Pohnpei", "Pacific/Ponape", "Pacific/Port_Moresby", "Pacific/Rarotonga",
      "Pacific/Saipan", "Pacific/Samoa", "Pacific/Tahiti", "Pacific/Tarawa", "Pacific/Tongatapu",
      "Pacific/Truk", "Pacific/Wake", "Pacific/Wallis", "Pacific/Yap",
      "Poland", "Portugal", "ROC", "ROK", "Singapore", "Turkey", "UCT",
      "US/Alaska", "US/Aleutian", "US/Arizona", "US/Central", "US/East-Indiana", "US/Eastern", "US/Hawaii",
      "US/Indiana-Starke", "US/Michigan", "US/Mountain", "US/Pacific", "US/Samoa",
      "UTC", "Universal", "W-SU", "WET", "Zulu"
    ];

    try {
      // Format the timezones with labels and offsets
      const formattedTimezones = timezonesList.map((tz) => {
        try {
          // Get the offset for this timezone
          const time = dayjs().tz(tz);
          const offsetMinutes = time.utcOffset();
          const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
          const offsetMins = Math.abs(offsetMinutes) % 60;
          const offsetSign = offsetMinutes >= 0 ? '+' : '-';
          const offsetFormatted = `${offsetSign}${offsetHours.toString().padStart(2, '0')}:${offsetMins.toString().padStart(2, '0')}`;

          // Create a readable label
          const label = tz.replace(/_/g, ' ').replace(/\//g, ' / ');

          return {
            value: tz,
            label: `${label} (UTC${offsetFormatted})`,
            offset: offsetFormatted
          };
        } catch (_) {
          // Skip invalid timezones
          return null;
        }
      }).filter((tz): tz is Timezone => tz !== null)
        .sort((a, b) => {
          // First by offset
          if (a.offset !== b.offset) {
            return a.offset.localeCompare(b.offset);
          }
          // Then by name
          return a.label.localeCompare(b.label);
        });

      setTimezones(formattedTimezones);
    } catch (err) {
      console.error('Error processing timezones:', err);
      // Fallback to a minimal list if there's an issue
      const fallbackTimezones = [
        {value: 'UTC', label: 'UTC (UTC+00:00)', offset: '+00:00'},
        {value: 'America/New_York', label: 'America / New York (UTC-05:00)', offset: '-05:00'},
        {value: 'America/Los_Angeles', label: 'America / Los Angeles (UTC-08:00)', offset: '-08:00'},
        {value: 'Europe/London', label: 'Europe / London (UTC+00:00)', offset: '+00:00'},
        {value: 'Europe/Paris', label: 'Europe / Paris (UTC+01:00)', offset: '+01:00'},
        {value: 'Asia/Tokyo', label: 'Asia / Tokyo (UTC+09:00)', offset: '+09:00'},
        {value: 'Asia/Shanghai', label: 'Asia / Shanghai (UTC+08:00)', offset: '+08:00'},
        {value: 'Australia/Sydney', label: 'Australia / Sydney (UTC+10:00)', offset: '+10:00'},
      ];
      setTimezones(fallbackTimezones);
    }
  }, []);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fromDropdownRef.current && !fromDropdownRef.current.contains(event.target as Node)) {
        setFromDropdownOpen(false);
      }
      if (toDropdownRef.current && !toDropdownRef.current.contains(event.target as Node)) {
        setToDropdownOpen(false);
      }
      if (timestampDropdownRef.current && !timestampDropdownRef.current.contains(event.target as Node)) {
        setTimestampDropdownOpen(false);
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // World clocks with major timezones
  const worldClockTimezones = timezones.length > 0
    ? [
      timezones.find(tz => tz.value === 'UTC') || {value: 'UTC', label: 'UTC', offset: '+00:00'},
      timezones.find(tz => tz.value === 'America/New_York') || timezones.find(tz => tz.value.includes('New_York')),
      timezones.find(tz => tz.value === 'America/Los_Angeles') || timezones.find(tz => tz.value.includes('Los_Angeles')),
      timezones.find(tz => tz.value === 'Europe/London') || timezones.find(tz => tz.value.includes('London')),
      timezones.find(tz => tz.value === 'Europe/Paris') || timezones.find(tz => tz.value.includes('Paris')),
      timezones.find(tz => tz.value === 'Asia/Tokyo') || timezones.find(tz => tz.value.includes('Tokyo')),
      timezones.find(tz => tz.value === 'Asia/Shanghai') || timezones.find(tz => tz.value.includes('Shanghai')),
      timezones.find(tz => tz.value === 'Australia/Sydney') || timezones.find(tz => tz.value.includes('Sydney')),
    ].filter((tz): tz is Timezone => tz !== undefined)
    : [];

  const inputDateTime = dayjs.tz(inputDate, fromTimezone);
  const convertedDateTime = inputDateTime.tz(toTimezone);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Globe className="w-6 h-6 text-indigo-600"/>
          <h2 className="text-2xl font-bold text-gray-900">Timezone Conversion</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date & Time
            </label>
            <input
              type="datetime-local"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Timezone
            </label>
            <div className="relative" ref={fromDropdownRef}>
              <button
                type="button"
                onClick={() => setFromDropdownOpen(!fromDropdownOpen)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-left flex justify-between items-center"
              >
                <span>{timezones.find(tz => tz.value === fromTimezone)?.label || fromTimezone}</span>
                <span>▼</span>
              </button>

              {fromDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                  <input
                    type="text"
                    value={fromSearchQuery}
                    onChange={(e) => setFromSearchQuery(e.target.value)}
                    placeholder="Search timezones..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-t-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  />
                  <div className="max-h-48 sm:max-h-60 overflow-auto">
                    {timezones.filter(tz => tz.label.toLowerCase().includes(fromSearchQuery.toLowerCase())).map((tz) => (
                      <div
                        key={tz.value}
                        onClick={() => {
                          setFromTimezone(tz.value);
                          setFromDropdownOpen(false);
                          setFromSearchQuery('');
                        }}
                        className="cursor-pointer select-none px-3 py-2 hover:bg-indigo-600 hover:text-white text-sm break-words"
                      >
                        {tz.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Timezone
            </label>
            <div className="relative" ref={toDropdownRef}>
              <button
                type="button"
                onClick={() => setToDropdownOpen(!toDropdownOpen)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-left flex justify-between items-center"
              >
                <span>{timezones.find(tz => tz.value === toTimezone)?.label || toTimezone}</span>
                <span>▼</span>
              </button>

              {toDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                  <input
                    type="text"
                    value={toSearchQuery}
                    onChange={(e) => setToSearchQuery(e.target.value)}
                    placeholder="Search timezones..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-t-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  />
                  <div className="max-h-48 sm:max-h-60 overflow-auto">
                    {timezones.filter(tz => tz.label.toLowerCase().includes(toSearchQuery.toLowerCase())).map((tz) => (
                      <div
                        key={tz.value}
                        onClick={() => {
                          setToTimezone(tz.value);
                          setToDropdownOpen(false);
                          setToSearchQuery('');
                        }}
                        className="cursor-pointer select-none px-3 py-2 hover:bg-indigo-600 hover:text-white text-sm break-words"
                      >
                        {tz.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Result</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">Source Time</div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-gray-900 mb-1">
                {inputDateTime.format('HH:mm:ss')}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {inputDateTime.format('MMMM D, YYYY')}
              </div>
              <div className="text-xs bg-white px-2 py-1 rounded text-indigo-600 break-words">
                {fromTimezone.replace(/_/g, ' ')}
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">Converted Time</div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-indigo-600 mb-1">
                {convertedDateTime.format('HH:mm:ss')}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {convertedDateTime.format('MMMM D, YYYY')}
              </div>
              <div className="text-xs bg-white px-2 py-1 rounded text-purple-600 break-words">
                {toTimezone.replace(/_/g, ' ')}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-600"/>
            World Clock
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {worldClockTimezones.map((tz) => {
              const time = dayjs().tz(tz.value);
              return (
                <div key={tz.value}
                     className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-900 mb-1 text-sm sm:text-base break-words">
                    {tz.value.split('/').pop()?.replace(/_/g, ' ')}
                  </div>
                  <div className="text-lg sm:text-xl font-mono font-bold text-indigo-600 mb-1">
                    {time.format('HH:mm')}
                  </div>
                  <div className="text-sm text-gray-600">
                    {time.format('MMM D')}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    UTC{tz.offset}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">ℹ️ Note:</h4>
          <p className="text-sm text-gray-700">
            Timezone conversion is based on the IANA timezone database. {timezones.length} timezones are available.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
        <div className="flex items-center gap-2 mb-6">
          <Globe className="w-6 h-6 text-indigo-600"/>
          <h2 className="text-2xl font-bold text-gray-900">Timestamp to Date Converter</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Timestamp
            </label>
            <input
              type="number"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="Enter a Unix timestamp..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timestamp Type
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-indigo-600"
                  checked={timestampType === 'seconds'}
                  onChange={() => setTimestampType('seconds')}
                />
                <span className="ml-2">Seconds</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-indigo-600"
                  checked={timestampType === 'milliseconds'}
                  onChange={() => setTimestampType('milliseconds')}
                />
                <span className="ml-2">Milliseconds</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Timezone
            </label>
            <div className="relative" ref={timestampDropdownRef}>
              <button
                type="button"
                onClick={() => setTimestampDropdownOpen(!timestampDropdownOpen)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-left flex justify-between items-center"
              >
                <span>{timezones.find(tz => tz.value === timestampTimezone)?.label || timestampTimezone}</span>
                <span>▼</span>
              </button>

              {timestampDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                  <input
                    type="text"
                    value={timestampSearchQuery}
                    onChange={(e) => setTimestampSearchQuery(e.target.value)}
                    placeholder="Search timezones..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-t-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  />
                  <div className="max-h-48 sm:max-h-60 overflow-auto">
                    {timezones.filter(tz => tz.label.toLowerCase().includes(timestampSearchQuery.toLowerCase())).map((tz) => (
                      <div
                        key={tz.value}
                        onClick={() => {
                          setTimestampTimezone(tz.value);
                          setTimestampDropdownOpen(false);
                          setTimestampSearchQuery('');
                        }}
                        className="cursor-pointer select-none px-3 py-2 hover:bg-indigo-600 hover:text-white text-sm break-words"
                      >
                        {tz.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Timestamp Conversion Result</h3>
          {timestamp ? (
            (() => {
              try {
                const timestampValue = parseInt(timestamp);
                if (isNaN(timestampValue)) {
                  return (
                    <div className="text-red-600 bg-red-50 p-3 rounded">
                      Please enter a valid number
                    </div>
                  );
                }

                const date = timestampType === 'seconds'
                  ? dayjs.unix(timestampValue).tz(timestampTimezone)
                  : dayjs(timestampValue).tz(timestampTimezone);

                return (
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-mono font-bold text-teal-600 mb-1">
                      {date.format('HH:mm:ss')}
                    </div>
                    <div className="text-base sm:text-lg text-gray-800 mb-2">
                      {date.format('dddd, MMMM D, YYYY')}
                    </div>
                    <div className="text-xs bg-white px-2 py-1 rounded inline-block text-teal-600 break-words">
                      {timestampTimezone.replace(/_/g, ' ')}
                    </div>
                    <div className="mt-4 text-sm">
                      <div className="grid grid-cols-1 gap-2 text-left">
                        <div className="bg-white p-2 rounded break-all">
                          <span className="text-gray-600">ISO Format:</span> {date.toISOString()}
                        </div>
                        <div className="bg-white p-2 rounded break-words">
                          <span className="text-gray-600">Relative:</span> {date.fromNow()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } catch (error) {
                return (
                  <div className="text-red-600 bg-red-50 p-3 rounded">
                    Error converting timestamp: {String(error)}
                  </div>
                );
              }
            })()
          ) : (
            <div className="text-gray-500 text-center italic">
              Enter a timestamp to see the conversion result
            </div>
          )}
        </div>

        <div className="text-sm text-gray-700">
          <p>
            <strong>Tips:</strong>
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Unix timestamp in seconds represents the number of seconds since January 1, 1970 (Unix Epoch)</li>
            <li>Current Unix timestamp in seconds: <span className="font-mono">{Math.floor(Date.now() / 1000)}</span>
            </li>
            <li>Current Unix timestamp in milliseconds: <span className="font-mono">{Date.now()}</span></li>
          </ul>
        </div>
      </div>

      <CodeExample
        title="Timezone Examples"
        code={`import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// Create a date in a specific timezone
const date = dayjs.tz('${inputDate}', '${fromTimezone}');

// Convert to another timezone
const converted = date.tz('${toTimezone}');

console.log('Original:', date.format()); // ${inputDateTime.format()}
console.log('Converted:', converted.format()); // ${convertedDateTime.format()}

// Current time in different timezones
console.log('UTC:', dayjs.utc().format()); // ${dayjs.utc().format()}
console.log('Tokyo:', dayjs().tz('Asia/Tokyo').format()); // ${dayjs().tz('Asia/Tokyo').format()}

// Get timezone offset
console.log('Offset:', date.utcOffset()); // ${inputDateTime.utcOffset()} minutes`}
      />

    </div>
  );
};

export default TimezoneConverter;