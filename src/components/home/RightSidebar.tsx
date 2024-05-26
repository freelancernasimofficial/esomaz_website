import Link from "next/link";
import React from "react";
import { dummyProjects } from "@/library/dummyProjects";
import IconUsers from "../icons/IconUsers";

type Props = {};

export default async function RightSidebar({}: Props) {
  return (
    <div className='hidden lg:flex max-w-96 w-full full-height sticky top-20  flex-col pl-6'>
      <div className='bg-white shadow p-4 rounded-lg overflow-hidden '>
        <div className='flex justify-between items-center pb-2'>
          <h1 className='font-semibold '>Latest Jobs</h1>
        </div>
        <div className='w-full h-full overflow-x-hidden overflow-y-scroll pb-5'>
          {dummyProjects.map((project) => {
            return (
              <div
                className='mb-4 border border-gray-200 rounded-lg p-2 '
                key={project.id}
              >
                <div className='text-sm font-semibold'>{project.title}</div>
                <div className='text-gray-500'>
                  {project.description.substring(0, 50)}{" "}
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
    </div>
  );
}
