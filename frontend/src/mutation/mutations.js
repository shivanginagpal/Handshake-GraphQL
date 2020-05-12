import { gql } from 'apollo-boost';

const addStudentMutation = gql`
    mutation AddStudent($name: String, $email: String, $password: String, $school: String){
        addStudent(name: $name, email: $email, password: $password, school: $school){
            message
            status
        }
    }
`;

const addCompanyMutation = gql`
    mutation AddCompany($name: String, $email: String, $password: String, $location: String){
        addCompany(name: $name, email: $email, password: $password, location: $location){
            message
            status
        }
    }
`;

const loginMutation = gql`
    mutation login($email: String, $password: String, $userType:String){
        login(email: $email, password: $password, userType: $userType){
            message
            status
        }
    }
`

const addJobMutation = gql`
    mutation AddJob($title: String, $posting_date: String,
        $application_deadline: String,$job_description: String,
        $location:String, $salary:String, $job_category: String,
        $company_id:String
        ){
        addJob(title: $title, posting_date: $posting_date, 
            application_deadline: $application_deadline, job_description: $job_description, 
            location: $location, salary: $salary, job_category: $job_category,
            company_id: $company_id){
            message
            status
        }
    }
`

const applyJobMutation = gql`
mutation ApplyJob ($student_id: String, $job_id: String ){
    applyJob(student_id:$student_id, job_id: $job_id){
        message
        status
    }
}
`;

const updateStudentBasic = gql`
mutation UpdateStudentBasic ($student_id: String, $city: String, $state: String, $country: String, $dob: String, $major: String, $career_obj: String){
updateStudentBasic(student_id: $student_id, city: $city, state: $state, country: $country, dob: $dob, major: $major, career_obj: $career_obj )
{
    message
    status
}
}
`;

const updateStudentEducation = gql`
mutation UpdateStudentEducation ($student_id: String, $school: String, $degree: String, $education_major: String, $year_of_passing: String, $cgpa: String){
updateStudentEducation(student_id: $student_id, school: $school, degree: $degree, education_major: $education_major, year_of_passing: $year_of_passing, cgpa: $cgpa )
{
    message
    status
}
}
`;

const updateStudentExperience = gql`
mutation UpdateStudentExperience ($student_id: String, $title: String, $company: String, $location: String, $from: String, $to: String, $description: String){
updateStudentExperience(student_id: $student_id, title: $title, company: $company, location: $location, from: $from, to: $to, description: $description )
{
    message
    status
}
}
`;

const updateCompanyProfile = gql`
mutation updateCompanyProfile ($company_id: String, $name: String, $location: String, $description: String){
    updateCompanyProfile(company_id: $company_id, name: $name, location: $location, description: $description )
    {
        message
        status
    }
    }
`;

export {addStudentMutation,
        addCompanyMutation,
        loginMutation,
        addJobMutation,
        applyJobMutation,
        updateStudentBasic,
        updateStudentEducation,
        updateStudentExperience,
        updateCompanyProfile
        };