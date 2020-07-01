import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  {API_URL as apiUrl } from '../../config/config';
import { AbstractApiConnector } from './api-connectors/AbstractApiConnector';
import { MapApiConnector } from './api-connectors/MapApiConnector';
import { UserApiConnector } from './api-connectors/UserApiConnector';

export enum Connector {
  MAP = '[Map]',
  USER = '[User]'
}

@Injectable({providedIn: 'root'})
export class ApiCommunicationService {
  private readonly apiBaseUrl: string;
  private connectors: Map<Connector, AbstractApiConnector>;

  constructor(
    private readonly http: HttpClient
  ) {
    // set base url
    this.apiBaseUrl = apiUrl;

    // map of connectors
    this.connectors = new Map<Connector, AbstractApiConnector>();

    // register connectors
    this.registerConnector(
      Connector.MAP,
      new MapApiConnector(this.http, this.apiBaseUrl)
    );
    this.registerConnector(
      Connector.USER,
      new UserApiConnector(this.http, this.apiBaseUrl)
    );
    
  }

  /**
   * Registers a connector to the connector pool.
   * @param id: Connector - The unique identifier for a connector.
   * @param connector:AbstractApiConnector} - The connector to register.
   */
  private registerConnector(id: Connector, connector: AbstractApiConnector) {
    if (this.connectors.has(id)) {
      throw new Error(
        'A connector with ID \'' + id + '\' has already been registered.'
      );
    }
    try {
      this.connectors.set(id, connector);
    } catch (e) {
      throw new Error('Could not register connector: ' + e);
    }
  }

  /**
   * Gets a connector from the connector pool.
   * @param connector: Connector - The unique identifier for a connector.
   * @returns AbstractApiConnector | undefined - The connector itself
   */
  private getConnector(connector: Connector): AbstractApiConnector | undefined {
    if (!this.connectors.has(connector)) {
      throw new Error('No connector is registered for: ' + connector);
    }

    return this.connectors.get(connector);
  }

  // API connector getters
  public welcome(): MapApiConnector {
    return this.getConnector(Connector.MAP) as MapApiConnector;
  }

  public user(): UserApiConnector {
    return this.getConnector(Connector.USER) as UserApiConnector;
  }
}