import { Sequelize } from 'sequelize'
import config from '@/orm/config'

export const sequelize = new Sequelize(config)

export const Account = sequelize.import('@/orm/models/account')
