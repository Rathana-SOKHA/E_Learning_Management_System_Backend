import {Response, Request} from "express";
import {AppDataSource} from "../config/data-source.js";
import {Course} from "../entities/Course.js";
import {User} from "../entities/User.js";

const courseRepository = AppDataSource.getRepository(Course);
const userRepository = AppDataSource.getRepository(User);

export const createCourse = async (
    req: Request,
    res: Response
)=> { 
    try {
        const {title, description, teacher_id} = req.body;

        // find teacher
        const teacher = await userRepository.findOne({
            where: {
                id: teacher_id,
            },
        });

        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found",
            });
        }
         

// create course
        const course = courseRepository.create({
            title,
            description,
            teacher: teacher,
        });

        await courseRepository.save(course);

        res.status(201).json({
            message: "Course created successfully",
            course,
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};  