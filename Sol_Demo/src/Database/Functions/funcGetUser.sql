DROP FUNCTION funcGetUser
CREATE OR REPLACE FUNCTION funcGetUser
(
	Command$ Varchar(100),
	UserIdentity$ uuid DEFAULT NULL
)
/*RETURNS TABLE (
				UserIdentity uuid,
				FirstName Varchar(50),
				LastName Varchar(50)
			)*/
  RETURNS SETOF RECORD
AS $$
BEGIN
	IF (Command$='GetAllUser') THEN
		RAISE NOTICE '%',Command$;
		
		RETURN QUERY 
			SELECT 
			U.UserIdentity As UserIdentity,
			CAST(U.info->>'FirstName' AS VARCHAR(50)) as FirstName,
			CAST(u.info->>'LastName' AS VARCHAR(50)) As LastName,
			CAST(u.info-> 'Login' ->> 'UserName' AS VARCHAR(50)) as UserName
		FROM 
			tbluser As U;	
	ELSEIF (Command$='GetFirstName') THEN
		RAISE NOTICE '%',Command$;
		
		RETURN QUERY 
			SELECT 
			U.UserIdentity As UserIdentity,
			CAST(U.info->>'FirstName' AS VARCHAR(50)) as FirstName
			--CAST(u.info->>'LastName' AS VARCHAR(50)) As LastName
		FROM 
			tbluser As U;	
	END IF;
END;$$
LANGUAGE plpgsql;

SELECT * FROM funcGetUser('GetAllUser',NULL) as f(UserIdentity uuid,FirstName Varchar(50),LastName Varchar(50));
SELECT * FROM funcGetUser('GetFirstName',NULL) as f(UserIdentity uuid,FirstName Varchar(50));

SELECT funcSetUser('Update','f59bae6f-4973-440d-b12f-851f011ea66a','Eshaan','Naik');

SELECT funcSetUser('Delete','f59bae6f-4973-440d-b12f-851f011ea66a',NULL,NULL);