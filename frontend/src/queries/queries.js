import { gql } from 'apollo-boost';

const getStudentJobsQuery = gql`
query($id: String){
    jobs(id: $id){
        name
        id
        jobs{
            _id
            title
            posting_date
            application_deadline
            location
            salary
            job_description
            job_category
        }
    }
}
`;

const getCompanyJobsQuery = gql`
    query($id: String){
        company(id: $id) {
                jobs{
                title
                posting_date
                application_deadline
                location
                salary
                job_description
                job_category
                _id
            }
        }
    }
`;

const getStudentsforJob = gql`
query($job_id: String){
    getStudentsForJob(job_id: $job_id) {
        student{
            name
            id
            school
        }
    }
}
`;

const getAllJobsAppliedQuery = gql`
query($student_id: String){
    getAllJobsApplied(student_id: $student_id){
       company{
        name
        jobs{
            _id
            title
            posting_date
            application_deadline
            location
            salary
            job_description
            job_category
            }
        }
    }
}
`;

const getAllStudentQueries = gql`
query($id: String){
    getAllStudents(id: $id){
        user{
            id
            name
            email
            school
        }
        city
        state
        country
    }
}
`;

const getcompanyProfile = gql`
query($id: String){
    company(id: $id){
        name
        email
        location
        description
    }
}
`;

const getStudentProfile = gql`
query($student_id: String){
    studentProfile(student_id: $student_id){
        user{
            name
        }
        city
        state
        country
        dob
        major
        career_obj
        education{
            school
            degree
            education_major
            year_of_passing
            cgpa
        }
        experience{
            title
            company
            location
            from
            to
            description
        }
    }
}
`;

export { getCompanyJobsQuery,
        getStudentsforJob,
        getStudentJobsQuery,
        getAllJobsAppliedQuery,
        getAllStudentQueries,
        getcompanyProfile,
        getStudentProfile
        };