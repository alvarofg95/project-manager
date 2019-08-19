import React from 'react';
import CustomButton from './buttons/CustomButton';
import { USER } from '../utils/constants';

export default ({ users }) =>
  users.length ? (
    <table>
      <thead>
        <tr>
          <td>NICK</td>
          <td>EMAIL</td>
          <td>ROL</td>
          <td>Fecha de Creación</td>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td>{user.nick}</td>
            <td>{user.email}</td>
            <td>
              {user.role === USER ? (
                <img
                  title="Usuario"
                  width={35}
                  alt="circle"
                  src={require('../assets/images/oval.svg')}
                />
              ) : (
                <img
                  title="Administrador"
                  width={35}
                  alt="star"
                  src={require('../assets/images/star.svg')}
                />
              )}
            </td>
            <td>{user.creationDate}</td>
            <td>
              <CustomButton text="Borrar" />
              <CustomButton text="Editar" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <span>No hay usuarios</span>
  );
