// @ts-check
import { test, expect } from '@playwright/test';

/**
 * 1. SELECTORS
 * Targeted based on the current SwiftTranslator UI structure.
 */
const INPUT_SELECTOR = 'textarea[placeholder*="Input Your Singlish"]';
const OUTPUT_SELECTOR = 'div.w-full.h-80.p-3.rounded-lg';

/**
 * 2. TEST CASES 
 * Compiled from Excel Scenarios (dewexcelsheet.xlsx)
 */
const testCases = [
  // --- POSITIVE FUNCTIONAL TESTS ---
  { 
    id: 'Pos_Fun_0001', 
    name: 'Simple Past Tense Action', 
    input: 'mama iiyee giyaa.', 
    expected: 'මම ඊයේ ගියා.' 
  },
  { 
    id: 'Pos_Fun_0002', 
    name: 'Hardware Troubleshooting Terms', 
    input: 'PC ekee USB port eka vaeda naee.', 
    expected: 'PC එකේ USB port එක වැඩ නෑ.' 
  },
  { 
    id: 'Pos_Fun_0003', 
    name: 'Contrasting Status', 
    input: 'vaeda thibunaa, eth mama iwara kalaa.', 
    expected: 'වැඩ තිබුණා, ඒත් මම ඉවර කළා.' 
  },
  { 
    id: 'Pos_Fun_0004', 
    name: 'Informal Chat Paragraph', 
    input: 'suba dhavasak!\nmama iiyee kadeeta giyaa. haebaeyi mata oonee karana badu tika hambunee naee.\nheta udhetath gihin balanna oonee.', 
    expected: 'සුබ දවසක්! මම ඊයේ කඩේට ගියා. හැබැයි මට ඕනේ කරන බඩු ටික හම්බුනේ නෑ. හෙට උදෙටත් ගිහින් බලන්න ඕනේ.' 
  },
  { 
    id: 'Pos_Fun_0005', 
    name: 'Compound with Reason', 
    input: 'eyaalaa vaeda nisaa api nathara vunee , eth dhaen yamu.', 
    expected: 'එයාලා වැඩ නිසා අපි නතර වුනේ , එත් දැන් යමු.' 
  },
  { 
    id: 'Pos_Fun_0006', 
    name: 'Large technical manual', 
    input: 'System eka configure kiriima pahasu vee. mulinma control panel ekata gihillaa network settings check karanna. eeth ekkama firewall eka off karanna oonee. nathnam internet connection eka block veyi. meya vahaama karanna', 
    expected: 'System එක configure කිරීම පහසු වේ. මුලින්ම control පනෙල් එකට ගිහිල්ලා network settings check කරන්න. ඒත් එක්කම firewall එක off කරන්න ඕනේ. නත්නම් internet connection එක block වෙයි. මෙය වහාම කරන්න' 
  },
  { 
    id: 'Pos_Fun_0007', 
    name: 'Polite request form', 
    input: 'karuNaakara eeka poddak balanna.', 
    expected: 'කරුණාකර ඒක පොඩ්ඩක් බලන්න.' 
  },
  { 
    id: 'Pos_Fun_0008', 
    name: 'Medium paragraph', 
    input: 'adha campus ekee lectures 3 k thibunaa. passee api friends laa ekka canteen giyaa saha podi kathaavak dhaalaa aavaa.', 
    expected: 'අද campus එකේ lectures 3 ක් තිබුනා. පස්සේ අපි friends ලා එක්ක canteen ගියා සහ පොඩි කතාවක් දාලා ආවා.' 
  },
  { 
    id: 'Pos_Fun_0009', 
    name: 'Repeated words for emphasis', 
    input: 'hari hari lassanayi.', 
    expected: 'හරි හරි ලස්සනයි.' 
  },
  { 
    id: 'Pos_Fun_0010', 
    name: 'Slang/Informal Context', 
    input: 'machoo, adha set velaa match eka balamu nedha?', 
    expected: 'මචෝ, අද සෙට් වෙලා match එක බලමු නේද?' 
  },
  { 
    id: 'Pos_Fun_0011', 
    name: 'Transliteration of a professional project update', 
    input: 'aluth project ekee deadline eka April 15 venidhaata kalin finalize karanna oonee.', 
    expected: 'අලුත් project එකේ deadline එක April 15 වෙනිදාට කලින් finalize කරන්න ඕනේ.' 
  },
  { 
    id: 'Pos_Fun_0012', 
    name: 'Polite request form (Help)', 
    input: 'mata help ekak oonee.', 
    expected: 'මට help එකක් ඕනේ..' 
  },
  { 
    id: 'Pos_Fun_0013', 
    name: 'Complex Punctuation Handling', 
    input: 'ayiyoo! oyaa koheedha?', 
    expected: 'අයියෝ! ඔයා කොහේද?' 
  },
  { 
    id: 'Pos_Fun_0014', 
    name: 'Conversation with a request', 
    input: 'oyaata puluvandha mata meeting ekee link eka eevanna?', 
    expected: 'ඔයාට පුලුවන්ද මට meeting එකේ link එක ඒවන්න?' 
  },
  { 
    id: 'Pos_Fun_0015', 
    name: 'Long paragraph (stress‑free accuracy)', 
    input: 'adha university eke normal day ekak vitharayi. lectures valin passe library gihin assignments balalaa, evening friends la ekka podi relax ekak gaththaa. ehema unath studies hariyata karagena yanna oone kiyala therum gaththaa.', 
    expected: 'අද university eke normal day එකක් විතරයි. lectures වලින් පස්සෙ library ගිහින් assignments බලලා, evening friends ල එක්ක පොඩි relax එකක් ගත්තා. එහෙම උනත් studies හරියට කරගෙන යන්න ඕනෙ කියල තෙරුම් ගත්තා.' 
  },
  { 
    id: 'Pos_Fun_0016', 
    name: 'Banking transaction', 
    input: 'Rs. 5000k deposit kaLaa.', 
    expected: 'Rs. 5000ක් deposit කළා.' 
  },
  { 
    id: 'Pos_Fun_0017', 
    name: 'Conditional Logical Sentence', 
    input: 'paalama vahalaa nisaa mata enna baeri unaa..', 
    expected: 'පාලම වහලා නිසා මට එන්න බැරි උනා.' 
  },
  { 
    id: 'Pos_Fun_0018', 
    name: 'Formal News/Announcement (Large)', 
    input: 'adhika varshaava nisaa nava maarga padhdhathiya pramaadha viya haeki bava vaarthaa viya. meya thavath maasayakin pramaadha vana bava kiyayi.', 
    expected: 'අදික වර්ශාව නිසා නව මාර්ග පද්දතිය ප්‍රමාද විය හැකි බව වාර්තා විය. මෙය තවත් මාසයකින් ප්‍රමාද වන බව කියයි.' 
  },
  { 
    id: 'Pos_Fun_0019', 
    name: 'IT Maintenance Commands', 
    input: 'aluth software eka install karala restart karanna.', 
    expected: 'අලුත් software එක install කරල restart කරන්න.' 
  },
  { 
    id: 'Pos_Fun_0020', 
    name: 'Prohibition & Warning Message', 
    input: 'kisima hethuvak nisaa system ekee password eka share karanna epaa.', 
    expected: 'කිසිම හෙතුවක් නිසා system එකේ password එක share කරන්න එපා.' 
  },
  { 
    id: 'Pos_Fun_0021', 
    name: 'Conditional Technical Troubleshooting', 
    input: 'oyaagee PC eka on venne naethnam, power cable eka check karanna. thavath vaeda karanne naethnam service ekata dhenna oonee.', 
    expected: 'ඔයාගේ PC එක on වෙන්නෙ නැත්නම්, power cable එක check කරන්න. තවත් වැඩ කරන්නේ නැත්නම් service එකට දෙන්න ඕනේ.' 
  },
  { 
    id: 'Pos_Fun_0022', 
    name: 'Complex conditional sentence with mixed technical terminology', 
    input: 'oya enavaanam, Zoom meeting ekee link eka WhatsApp karanna puLuvandha?', 
    expected: 'ඔය එනවානම්, Zoom meeting එකේ link එක WhatsApp කරන්න පුළුවන්ද?.' 
  },
  { 
    id: 'Pos_Fun_0023', 
    name: 'Financial reporting', 
    input: 'mema maasayee muulYa parithYaagaya Rs. 75,000k vana athara, eya bank eka harahaa credit velaa aetha. oyaagee balance eka check karanna. USD 200k vaediyen thiyenavaa.i.', 
    expected: 'මෙම මාසයේ මූල්‍ය පරිත්‍යාගය Rs. 75,000ක් වන අතර, එය bank එක හරහා credit වෙලා ඇත. ඔයාගේ balance එක check කරන්න. USD 200ක් වැඩියෙන් තියෙනවා.' 
  },
  { 
    id: 'Pos_Fun_0024', 
    name: 'Future tense scheduling', 
    input: 'api heta udhaeesana 9.00ta lab ekata gihilla code eka test karamu.', 
    expected: 'අපි හෙට උදෑසන 9.00ට lab එකට ගිහිල්ල code එක test කරමු.' 
  },

  // --- NEGATIVE FUNCTIONAL TESTS ---
  // Note: 'expected' contains the Correct Output to validate against, 
  // even if the system currently fails (as noted in Excel Status).
  { 
    id: 'Neg_Fun_0025', 
    name: 'Joined words causing segmentation issue', 
    input: 'mamageharayanne', 
    expected: 'මම ගෙදර යන්නේ' 
  },
  { 
    id: 'Neg_Fun_0026', 
    name: 'Brackets & Parenthetical Handling', 
    input: 'assignment eka (Software Engineering) eka.', 
    expected: 'assignment එක (Software Engineering) එක.' 
  },
  { 
    id: 'Neg_Fun_0027', 
    name: 'Real-time update lag with special symbols', 
    input: 'meeka hariyata vaeda karanavaadha? @admin check karanna!!!', 
    expected: 'මේක හරියට වැඩ කරනවාද? @admin check කරන්න!!!' 
  },
  { 
    id: 'Neg_Fun_0028', 
    name: 'Nested parenthetical technical references', 
    input: 'Mee research paper eka (Journal of Science, 2023) anuwa, climate change eka lankawata (Sri Lanka) balapaana widhiya (Impact Factor: 4.5) godak sankeerNayi. Ehenam api meeka saha (and) eeke thiyena graphs (Figure 1.1) hariyata analyze karanna oonee neda?', 
    expected: 'මේ research paper එක (Journal of Science, 2023) අනුව, climate change එක ලංකාවට (Sri Lanka) බලපාන විධිය (Impact Factor: 4.5) ගොඩක් සංකීර්ණයි. එහෙනම් අපි මේක සහ (and) ඒකෙ තියෙන graphs (Figure 1.1) හරියට analyze කරන්න ඕනේ නේද?' 
  },
  { 
    id: 'Neg_Fun_0029', 
    name: 'Hyperlink Integrity Test', 
    input: 'www.sliit.lk ekata yanna.', 
    expected: 'www.sliit.lk එකට යන්න.' 
  },
  { 
    id: 'Neg_Fun_0030', 
    name: 'Formal Correspondence Layout', 
    input: 'Dear Sir, \n\n Magee registration number eka IT23305899. Mama meevana thuru assignment eka upload kalee naee.\n\n Karunaakara mata thava dhavas dhekak (02 days) kal avakaashaya dhenna. Thank you, \n Kamal.', 
    expected: 'Dear Sir, මගේ registration number එක IT23305899. මම මේවන තුරු assignment එක upload කරේ නෑ. කරුණාකර මට තව දවස් දෙකක් (02 days) කල් අවකාශය දෙන්න.' 
  },
  { 
    id: 'Neg_Fun_0031', 
    name: 'ISO Date format within a descriptive sentence', 
    input: 'project eka 2024-12-31 venidhaata finish karanna.', 
    expected: 'project එක 2024-12-31 වෙනිදාට finish කරන්න.' 
  },
  { 
    id: 'Neg_Fun_0032', 
    name: 'Nasal Consonant (Sanna) Mapping', 
    input: 'anga saha inga.', 
    expected: 'අඟ සහ ඉඟ.' 
  },
  { 
    id: 'Neg_Fun_0033', 
    name: 'Conjunct Character Rendering', 
    input: 'Mee prashnaya visandhanna nam api \'Prathishakthi\' (Immunity) vadhya vidhyava (Medical Science) hariyata igena ganna oonee. Prakurthi saha vikurthi kiyana dhekama meeke thiyenavaa.', 
    expected: 'මේ ප්‍රශ්නය විසඳන්න නම් අපි \'ප්‍රතිශක්ති\' (Immunity) වෛද්‍ය විද්‍යාව (Medical Science) හරියට ඉගෙන ගන්න ඕනේ. ප්‍රකෘති සහ විකෘති කියන දෙකම මේකේ තියෙනවා.' 
  },
  { 
    id: 'Neg_Fun_0034', 
    name: 'Mixed numeric and Sinhala suffixes', 
    input: '3venidhaata enna.', 
    expected: '3වෙනිදාට එන්න.' 
  }
];

test.describe('Assignment 1 Automation', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate and wait for stable state
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
  });

  for (const data of testCases) {
    test(`[${data.id}] ${data.name}`, async ({ page }) => {
      const inputField = page.locator(INPUT_SELECTOR);
      const outputElement = page.locator(OUTPUT_SELECTOR);
      
      // 1. Clear existing text
      await inputField.click();
      await inputField.clear();

      // 2. Sequential typing ensures real-time triggers 
      await inputField.pressSequentially(data.input, { delay: 20 });
      
      // 3. Trigger conversion explicitly via Enter
      await page.keyboard.press('Enter');

      // 4. Wait for output box to resolve from empty state
      await expect(outputElement).not.toBeEmpty({ timeout: 10000 });

      // 5. Final validation against Expected Output
      await expect(outputElement).toContainText(data.expected);

      console.log(`\n--- TEST PASSED: ${data.id} ---`);
    });
  }
});

/**
 * 3. UI REAL-TIME UPDATE TEST
 */
test('Pos_UI_0001: Real-time update check', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const input = page.locator(INPUT_SELECTOR);
  const output = page.locator(OUTPUT_SELECTOR);
  
  await input.click();
  // Typing 'man' triggers real-time conversion to 'මන්'
  await page.keyboard.type('man');
  await page.keyboard.press('Space');

  // Verify real-time behavior 
  await expect(output).toContainText('මන්', { timeout: 7000 });
  
  console.log('UI Test Passed: Output updated in real-time');
});

// --- Case 35: Negative UI Test for line break preservation failure ---
test('Neg_UI_0035: Failure to preserve spacing when copy-pasting long text', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  const input = page.locator(INPUT_SELECTOR);
  const output = page.locator(OUTPUT_SELECTOR);

  // Simulating multi-line input to test formatting preservation from Excel Data
  const multilineInput = "mama research karanna oonee. api iiLaGa sathiyee project eka submit karanna thiyenavaa. Zoom meeting ekak thiyenavaa.";
  const expectedText = "මම research කරන්න ඕනේ. අපි ඊළඟ සතියේ project එක submit කරන්න තියෙනවා. Zoom meeting එකක් තියෙනවා.";
  
  await input.click();
  await input.pressSequentially(multilineInput, { delay: 30 });
  await page.keyboard.press('Enter');
  
  const actualText = await output.innerText();
  
  // The Excel indicates this fails to preserve formatting.
  // Standard test logic: Assert that it MATCHES expected. If the bug exists, this test will fail (which is correct).
  // If you want to assert the failure specifically: expect(actualText).not.toEqual(expectedText);
  await expect(output).toContainText(expectedText); 
  
  console.log('Neg_UI_0035 Check complete.');
});