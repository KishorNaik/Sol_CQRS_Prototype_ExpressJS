CREATE OR REPLACE FUNCTION funcSetUser
(
	Command$ Varchar(100),
	UserIdentity$ uuid DEFAULT NULL,
	FirstName$ Varchar(50) DEFAULT NULL,
	LastName$ Varchar(50) DEFAULT NULL,
	UserName$ Varchar(50) DEFAULT NULL,
	Password$ Varchar(50) DEFAULT NULL
)
RETURNS RECORD
AS $$
	DECLARE 
	_UserIdentity Record;
	jsonObject JSON;
BEGIN
	IF (Command$='Add') THEN
		RAISE NOTICE '%',Command$;
		
		jsonObject:=jsonb_build_object(
		'FirstName',FirstName$,
		'LastName',LastName$,
		'Login',jsonb_build_object(
				'UserName',UserName$,
				'Password',Password$
			)
		);
		
		INSERT INTO tblUser
		(
			info
		)
		VALUES
		(
			jsonObject
		)
		RETURNING UserIdentity INTO _UserIdentity;
		
		RETURN _UserIdentity;
	ELSEIF Command$='Update' THEN
	
		jsonObject:=jsonb_build_object(
		'FirstName',FirstName$,
		'LastName',LastName$,
		'Login',jsonb_build_object(
				'UserName',UserName$,
				'Password',Password$
			));
		
		UPDATE tbluser
			SET 
				info=jsonObject
			WHERE
				useridentity=UserIdentity$;
		RETURN _UserIdentity;
	ELSEIF Command$='Delete' THEN
		DELETE FROM tbluser WHERE UserIdentity=UserIdentity$;
		RETURN _UserIdentity;
	END IF;
END;$$
LANGUAGE plpgsql;

SELECT funcSetUser('Add',NULL,'Eshaan','Naik');

SELECT funcSetUser('Update','f59bae6f-4973-440d-b12f-851f011ea66a','Kishor','Naik');

SELECT funcSetUser('Delete','f59bae6f-4973-440d-b12f-851f011ea66a',NULL,NULL);


SELECT * FROM tbluser;

TRUNCATE TABLE tblUser RESTART IDENTITY;