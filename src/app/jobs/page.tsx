import IconUsers from "@/components/icons/IconUsers";
import { dummyProjects } from "@/library/dummyProjects";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className='container mb-4'>
      <div className='centerCard p-3 shadow bg-white rounded-lg'>
        <div className='flex justify-between items-center mb-2'>
          <h2 className='font-semibold '>Latest Jobs</h2>
        </div>
        {dummyProjects.map((project) => {
          return (
            <div
              className='mb-4 border border-gray-200 rounded-lg p-2 '
              key={project.id}
            >
              <div className='text-sm font-semibold'>{project.title}</div>
              <div className='text-gray-500'>
                {project.description.substring(0, 200)}...
                <Link className=' text-primary-main' href='#'>
                  Read More
                </Link>
              </div>
              <div className='flex items-center justify-between mt-2'>
                <div className='flex items-center'>
                  <IconUsers className='w-4 h-4' />{" "}
                  <div className='font-medium  ml-2 text-gray-500'>
                    {project.totalApplications} Bids
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className='font-medium  text-gray-500'>
                    Budget: ${project.budgetFrom}-${project.budgetTo}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
