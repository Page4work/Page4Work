<div dir="rtl">
  <img src="logo.PNG" alt="drawing" width="200"/>
  
# Page4Work

## אודות
ברוכים הבאים לפרוייקט PAGE4WORK!

אנחנו מאמינים
* למידה באמצעות עבודות כיתה חיוניית למורים ולתלמידים,
* באמצעות הטכנולוגיה ניתן לנצל את זמן למידת הכיתה בצורה הרבה יותר טובה.


תארו לעצמכם את המציאות הבאה: 
* תלמידים מקבלים משוב מידי על התשובות שלהם. 
* תלמידים מתקשים מזוהים ומקבלים תשומת לב כבר בהתחלת התרגיל. 
* עולם בו המורה יכול לסייע בבת אחת ובאופן פרטני למספר תלמידים בו זמנית!

WORK4PAGE נועדה לתת מענה לצרכים האלו, בלמידה רגילה וגם בלמידה וירטואלית דרך הזום.

## תכונות
* כתיבת שאלות, קבלת תשובות ושליחת משוב עם ציון לתלמיד בצורה קלה ופשוטה
* אפשרות לבדיקת תשובות בצורה רוחבית (לפי שאלה)
* מעקב מדוקדק אחרי מיקום התלמיד, קצב התקדמותו ואופן עבודתו
* שיתוף דפי עבודה בצורה היררכית - כל אחד יכול להיות מורה ותלמיד
* אפשרות להפעלה מקומית בבית הספר מחוץ לרשת האינטרנט (שמירה על פרטיות)

## בתוכנית
* יצירת דפי עבודה מתוך קובץ PDF
# הוראות התקנה למפתחים
## שרת

לנוחיותכם ניתן להריץ את הBACKEND בנפרד מהFRONTEND.
להרצת השרת ובסיס הנתונים (דורש שימוש בDOCKER) 
```
docker-compose build
docker-compose up
```
לאחר הטעינה ניתן לעבוד ישירות מול הAPI בפורט 5000 (http://localhost:5000/)

## לקוח

קימפול אתר האינטרנט (נדרש npm להורדת החבילות)
```
npm install
npm start
```
במידה ואתם מעדיפים לעבוד מול השרת שלנו ולא להריץ במקומי תצטרכו לשנות את כתובת השרת
```
 baseUrl = 'https://us-central1-vivid-fragment-225620.cloudfunctions.net/'
```
בקובץ server-connect.service.ts

ניתן לעבוד גם באופן מרוחק לחלוטין דרך יצירת FORK באתר STACKBLITZ
[link](https://stackblitz.com/edit/angular-sjcrfk?file=src/app/app.component.ts)
</div>
