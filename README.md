<div dir="rtl">
  <img src="logo.PNG" alt="drawing" width="200"/>
  
# Page4Work




# הוראות התקנה
##שרת
לנוחיותכם ניתן להריץ את הBACKEND בנפרד מהFRONTEND.
להרצת השרת ובסיס הנתונים (דורש שימוש בDOCKER)
```
docker-compose build
docker-compose up
```
לאחר הטעינה ניתן לעבוד ישירות מול הAPI בפורט 5000 (http://localhost:5000/)

##לקוח
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
[StackBlitz](https://stackblitz.com/edit/angular-sjcrfk?file=src/app/app.component.ts)
</div>
