import { Project } from "@/types/project";
import Image from "next/image";
import { motion } from "framer-motion";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)" }}
      className="rounded-xl bg-bauhaus-white shadow-lg p-6 flex flex-col items-center text-center border-2 border-bauhaus-green"
    >
      <Image 
        src={project.image} 
        alt={project.title} 
        width={250} 
        height={150} 
        className="rounded-lg object-cover w-full h-40 mb-4"
      />
      <h3 className="mt-2 text-xl font-bold text-bauhaus-blue mb-2">{project.title}</h3>
      <p className="text-gray-700 text-sm">{project.description}</p>
    </motion.div>
  );
} 