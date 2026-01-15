# Sample Texts for Testing

Use these sample texts to test the Bilingual Text Checker application.

## English Samples

### Sample 1: Common Errors
```
Their going too the store tommorow. Its important that they remembers to bring the shopping list, because they need too buy alot of things. The store is very busy on weekends so they should goes early in the morning. Its going to be a long day.
```

**Expected Issues:**
- Their → They're (spelling/grammar)
- too → to (spelling)
- tommorow → tomorrow (spelling)
- Its → It's (grammar)
- remembers → remember (grammar)
- alot → a lot (spelling)
- goes → go (grammar)

### Sample 2: Punctuation and Clarity
```
The meeting is scheduled for 3pm however we might need to reschedule it because the conference room is not available We should check with Sarah she usually knows about room bookings
```

**Expected Issues:**
- Missing comma after "3pm"
- Missing period after "available"
- Run-on sentences
- Missing punctuation

### Sample 3: Complex Grammar
```
The data shows that customer satisfaction have increased by 15% since we implemented the new system. Each of the employees were trained on proper usage and they has been very receptive to the changes.
```

**Expected Issues:**
- have → has (subject-verb agreement)
- were → was (subject-verb agreement)
- has → have (subject-verb agreement)

## Slovak Samples

### Sample 1: Common Slovak Errors
```
Dnes idem do obchoda. Musim si kúpit chlieb mlieko a vajicka. Je dôležite aby som nezabudol na nakupny zoznam. Obchod je velmi rušny počas vikendov.
```

**Expected Issues:**
- Musim → Musím (missing accent)
- vajicka → vajíčka (missing accent)
- dôležite → dôležité (spelling)
- nezabudol → nezabudol (grammar)
- nakupny → nákupný (missing accents)
- velmi → veľmi (spelling)
- rušny → rušný (missing accent)

### Sample 2: Slovak Grammar
```
Moj kamarát ma volal včera. Povedal mi že pride zajtra. Jeho sestra tiež chce prísť ale neviem či bude mat čas. Musime sa dohodnuť na presnom čase stretnutia.
```

**Expected Issues:**
- Moj → Môj (missing accent)
- ma → ma (missing accent)
- pride → príde (missing accent)
- mat → mať (missing accent)
- Musime → Musíme (missing accent)

### Sample 3: Slovak Punctuation
```
Peter Jana a Martin idu do kina Potrebuju si kupit listky este dnes lebo film je velmi popularny
```

**Expected Issues:**
- Missing commas in list
- Missing punctuation at sentence ends
- idu → idú (missing accent)
- Potrebuju → Potrebujú (missing accent)
- kupit → kúpiť (missing accent)
- este → ešte (spelling)
- velmi → veľmi (spelling)
- popularny → populárny (missing accent)

## Mixed Language Test

### Professional Email with Errors
```
Dear collegues,

I hope this email finds you good. I wanted to reach out regarding the upcoming project deadline which is aproaching quickly. Their are several task that needs to be completed before we can proceede with the implementation.

Please find attached the documents your going to need for the meeting tommorow. Let me know if you have any question.

Best regards
```

**Expected Issues:**
- collegues → colleagues
- good → well
- aproaching → approaching
- Their → There
- task → tasks
- needs → need
- proceede → proceed
- your → you're
- tommorow → tomorrow
- question → questions
- Missing punctuation in closing

## Testing Tips

1. **Start Simple**: Begin with Sample 1 texts to verify basic error detection
2. **Test Both Languages**: Switch between English and Slovak to ensure proper language detection
3. **Check Explanations**: Verify that correction explanations are clear and accurate
4. **Long Texts**: Test with longer paragraphs (500+ words) to check performance
5. **Perfect Text**: Try submitting error-free text to see the "No errors found" message

## Custom Test Cases

Feel free to create your own test cases based on:
- Common mistakes in your writing
- Specific grammar rules you want to verify
- Industry-specific terminology
- Regional language variations

---

**Note**: The AI may suggest different corrections or additional improvements beyond the examples listed above. This is normal and shows the AI's comprehensive analysis capabilities.
