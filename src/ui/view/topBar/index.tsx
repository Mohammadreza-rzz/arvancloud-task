import React from "react"
import { getUserData } from "@/utils/api"
import { cookies } from "next/headers"

import { LogoutButtonContainer, Button } from "@/ui/components"

interface IProps {}

const TopBar: React.FC<IProps> = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")
  const userData = await getUserData(!!token?.value ? token?.value : " ")
  const { email, username } = userData.data

  return (
    <div className='hidden w-full items-center justify-between bg-light-500 py-3 pl-[18px] pr-8 md:flex'>
      <span className='inline-flex items-center space-x-5'>
        <h2 className='text-paragraph_xl text-white'>Arvan Challenge</h2>
        <p className='text-paragraph_sm text-white'>
          Welcome {!!username ? username : email}
        </p>
      </span>
      <LogoutButtonContainer>
        <Button
          label='Logout'
          classnames='border border-info !py-2 !px-[19px] text-info hover:bg-info hover:text-white transition-colors duration-500'
        />
      </LogoutButtonContainer>
    </div>
  )
}

export default TopBar
