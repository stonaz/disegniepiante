SELECT scheda."#cartella", scheda."#foglio", scheda."#sub", scheda."luogo"  FROM "Principale_CD" as scheda INNER JOIN "Autore_CD" as autore
ON
(scheda."#cartella" = autore."#cartella") AND
(scheda."#foglio" = autore."#foglio") AND
(scheda."#sub" = autore."#sub");

