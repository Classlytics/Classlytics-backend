exports.createStudentQueryList = async (req) => {
    const { FirstName, LastName, Email, ClassRoll, DepartmentId, SessionId } = await req.body;
    return [
        `INSERT
            INTO
            Classlytics.User
            (
                FirstName
                , LastName
                , Email
                , RoleId
            )
            VALUES (
                '${FirstName}'
                ,'${LastName}'
                ,'${Email}'
                , 1
            );`,
        `INSERT
                INTO
                Classlytics.Student
                (
                    UserId 
                    , ClassRoll
                    , DepartmentId
                    , SessionId
                )
            VALUES (
                LAST_INSERT_ID()
                ,'${ClassRoll}'
                ,'${DepartmentId}'
                ,'${SessionId}'
            );`,
    ];
};
